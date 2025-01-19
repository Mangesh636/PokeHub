"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PokeApi } from "@/config/api";
import { Search } from "@/components/search";
import { Filter } from "@/components/filter";
import { PokemonCardProps } from "@/interface";
import { PokemonCard } from "@/components/pokemon/pokemon-card";

interface HomePageProps {
  name: string;
  url: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [sortOption, setSortOption] = useState("");

  // Reading the current page number from query string
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 100; // Number of pokemon per page
  const offset = (currentPage - 1) * limit; // Calculate number of pokemon per page

  // Reset sort option on new page
  useEffect(() => {
    setSortOption("");
  }, [currentPage]);

  // Fetching 100 pokemon for each page
  const {
    data: allPokemon,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    isFetching: isFetching,
    isPlaceholderData: isPlaceholderData,
  } = useQuery<HomePageProps[]>({
    queryKey: ["allPokemon", currentPage, limit, offset],
    queryFn: async () => {
      const response = await PokeApi(`pokemon?limit=${limit}&offset=${offset}`);
      return response.data.results;
    },
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  // Fetching pokemon details for card
  const {
    data: pokemonDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useQuery<PokemonCardProps[]>({
    queryKey: ["pokemonDetails", allPokemon],
    queryFn: async () => {
      if (!allPokemon) return [];
      const details = await Promise.all(
        allPokemon.map((pokemon) =>
          PokeApi<PokemonCardProps>(pokemon.url).then((res) => res.data),
        ),
      );
      return details;
    },
    staleTime: 1000 * 60 * 60,
    // Enable the query only if allPokemon data is available
    enabled: !!allPokemon,
  });

  // Filter Logic
  const filteredPokemon = pokemonDetails?.slice().sort((a, b) => {
    switch (sortOption) {
      // Ascending
      case "orderByIdAsc":
        return a.id - b.id;
      case "orderByNameAsc":
        return a.name.localeCompare(b.name);
      // Descending
      case "orderByIdDesc":
        return b.id - a.id;
      case "orderByNameDesc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (isLoadingAll || isLoadingDetails || isFetching)
    return (
      <section
        aria-live="polite"
        aria-busy="true"
        className="flex min-h-screen items-center justify-center"
      >
        <Image
          src={"/logo.png"}
          className="pointer-events-none h-48 w-48 animate-pulse rounded-full"
          alt="Logo PokeHub"
          width={250}
          height={250}
          priority
        />
      </section>
    );

  if (isErrorAll || isErrorDetails)
    return (
      <section
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center gap-4"
      >
        <Image
          src={"/logo.png"}
          className="pointer-events-none h-48 w-48 animate-pulse rounded-full"
          alt="Logo PokeHub"
          width={250}
          height={250}
          priority
        />
        <h1 className="mt-4 text-lg">Please... Refresh the Page.</h1>
      </section>
    );

  return (
    <Suspense>
      <section className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between py-4">
          <Search />
          <Filter onSortChange={(sort) => setSortOption(sort)} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPokemon?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              height={pokemon.height}
              id={pokemon.id}
              sprites={pokemon.sprites}
              name={pokemon.name}
              types={pokemon.types}
              weight={pokemon.weight}
            />
          ))}
        </div>
        <Pagination className="my-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${Math.max(currentPage - 1, 1)}`}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={
                  !isPlaceholderData && allPokemon
                    ? `/?page=${currentPage + 1}`
                    : "#"
                }
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={
                  !isPlaceholderData && allPokemon
                    ? `/?page=${currentPage + 2}`
                    : "#"
                }
              >
                {currentPage + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={
                  !isPlaceholderData && allPokemon
                    ? `/?page=${currentPage + 1}`
                    : "#"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </Suspense>
  );
}
