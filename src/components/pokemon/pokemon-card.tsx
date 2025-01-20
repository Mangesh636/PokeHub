"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Fredoka } from "next/font/google";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { PokemonCardProps } from "@/interface";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500"],
});

export const PokemonCard = ({
  height,
  id,
  name,
  sprites,
  types,
  weight,
}: PokemonCardProps) => {
  const router = useRouter();

  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;
  const homeSprite = sprites?.other?.home?.front_default;
  const frontDefault = sprites?.front_default;

  const mainType = types[0].type.name.toLowerCase();

  const imageSrc = officialArtwork || homeSprite || frontDefault;

  // Do not render pokemon card if there is not sprite
  if (!imageSrc) {
    return null
  }

  const handlePokemonClick = () => {
    router.push(`/pokemon/${name.toLowerCase()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handlePokemonClick}
    >
      <Card
        className="group relative rounded-3xl hover:drop-shadow-lg cursor-pointer"
        style={{
          background: `radial-gradient(circle at 90% 0%, var(--background-type-${mainType}) 36%, white 36%)`,
        }}
      >
        <CardHeader className="absolute right-2 top-2 rounded-full border bg-white px-2 py-1 text-sm text-black">
          #{id.toString().padStart(3, "0")}
        </CardHeader>
        <CardContent className="my-4">
            
          {/* Pokemon Image */}
          <div className="relative mb-4 aspect-square w-full">
            <Image
              width={150}
              height={150}
              alt={name}
              src={imageSrc}
              className="h-full w-full transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <h2
            className={cn(
              "mb-4 text-center text-xl font-bold capitalize",
              fredoka.className,
            )}
          >
            {/* Removing hyphen from name if any */}
            {name.replace(/-/g, ' ')}
          </h2>
          <div className="mb-2 flex justify-around px-4">
            <div className="text-center">
              <p className="font-bold">{(weight / 10).toFixed(1)} Kg</p>
              <p className="text-sm text-gray-600">Weight</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{(height / 10).toFixed(1)} M</p>
              <p className="text-sm text-gray-600">Height</p>
            </div>
          </div>
        </CardContent>

        {/* Types */}
        <CardFooter className="flex justify-center gap-6">
          {types.map((type) => {
            const typeName = type.type.name.toLowerCase();
            return (
              <span
                key={typeName}
                className={`rounded-full px-4 py-1 text-sm font-semibold capitalize text-white`}
                style={{ backgroundColor: `var(--types-${typeName})` }}
              >
                {typeName}
              </span>
            );
          })}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
