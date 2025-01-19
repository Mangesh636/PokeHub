"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/command";
import { PokeApi } from "@/config/api";
import { Search01Icon } from "hugeicons-react";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetching all pokemons
  const {
    data: searchPokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchPokemon", debouncedSearchTerm],
    queryFn: async () => {
      const response = await PokeApi("pokemon?limit=100000&offset=0");
      return response.data.results;
    },
    enabled: debouncedSearchTerm.length >= 3, // Search only when min 3 characters
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  // Filtering pokemon
  const filteredPokemon = searchPokemon?.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );
  return (
    <>
      <Command className="text-sm text-muted-foreground">
        {/* Shortcut to open Search Dialog */}
        <div>
          <CommandShortcut
            onClick={() => setIsOpen(!isOpen)}
            className="relative hidden h-8 w-full items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:inline-flex md:w-40 lg:w-56 xl:w-64 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <span className="hidden md:inline-flex">Search ...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </CommandShortcut>
        </div>
        <div>
          <CommandShortcut
            onClick={() => setIsOpen(true)}
            className="relative inline-flex h-8 items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 p-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <Search01Icon />
          </CommandShortcut>
        </div>

        {/* Search Dialog */}
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <CommandInput
            placeholder="Search Pokemon by name..."
            onChangeCapture={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
          />
          <CommandList>
            {isLoading && (
              <CommandEmpty className="animate-pulse">Loading...</CommandEmpty>
            )}
            {isError && (
              <CommandEmpty className="animate-pulse">
                Something went wrong...
              </CommandEmpty>
            )}
            <CommandGroup>
              {filteredPokemon?.map(
                (pokemon: { name: string; url: string }) => (
                  <Link
                    key={pokemon.name}
                    href={`/pokemon/${pokemon.name.toLowerCase()}`}
                  >
                    <CommandItem className="cursor-pointer">
                      {pokemon.name}
                    </CommandItem>
                  </Link>
                ),
              )}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </>
  );
};
