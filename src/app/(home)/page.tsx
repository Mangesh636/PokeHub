"use client";

import { Suspense } from "react";

import { PokemonHome } from "@/components/pokemon/pokemon-home";

export default function Home() {
  return (
    <Suspense>
      <PokemonHome />
    </Suspense>
  );
}
