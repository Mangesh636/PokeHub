"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SidebarLeftIcon } from "hugeicons-react";

import {
  PokemonAbilitys,
  PokemonGenders,
  PokemonGenerations,
  PokemonHabitats,
  PokemonHeight,
  PokemonMoves,
  PokemonTypes,
  PokemonWeight,
} from "@/constants/pokemon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Sidebar = () => {
  const pathname = usePathname();

  // Render nothing if the pathname isn't "/"
  if (pathname !== "/") return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SidebarLeftIcon className="block cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={"right"} className="w-80 p-0">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription className="sr-only">
          Sidebar to Filter Pokemons
        </SheetDescription>

        {/* MARK: Sidebar Content */}
        <ScrollArea className="h-full">
          <div className="flex select-none flex-col space-y-4 bg-white py-4 text-black">
            <div className="flex-1">
              <div className="mt-8 space-y-3 px-4 py-2">
                {/* Pokemon Type */}
                <div className="space-y-2">
                  <Label>Types</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select types" />
                    </SelectTrigger>
                    <SelectContent>
                      {PokemonTypes.map((item) => (
                        <SelectItem
                          key={item.key}
                          value={item.key}
                          className="pl-6"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pokemon Ability */}
                <div className="space-y-2">
                  <Label>Ability</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ability" />
                    </SelectTrigger>
                    <SelectContent>
                      {PokemonAbilitys.map((item) => (
                        <SelectItem
                          key={item.key}
                          value={item.key}
                          className="pl-6"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pokemon Habitats */}
                <div className="space-y-2">
                  <Label>Habitats</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select habitats" />
                    </SelectTrigger>
                    <SelectContent>
                      {PokemonHabitats.map((item) => (
                        <SelectItem
                          key={item.key}
                          value={item.key}
                          className="pl-6"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pokemon Moves */}
                <div className="space-y-2">
                  <Label>Moves</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select moves" />
                    </SelectTrigger>
                    <SelectContent>
                      {PokemonMoves.map((item) => (
                        <SelectItem
                          key={item.key}
                          value={item.key}
                          className="pl-6"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pokemon Generations */}
                <div className="space-y-2">
                  <Label>Generations</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select generations" />
                    </SelectTrigger>
                    <SelectContent>
                      {PokemonGenerations.map((item) => (
                        <SelectItem
                          key={item.key}
                          value={item.key}
                          className="pl-6"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {/* Pokemon Gender */}
                  <div className="space-y-2">
                    <Label className="text-sm">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {PokemonGenders.map((item) => (
                          <SelectItem
                            key={item.key}
                            value={item.key}
                            className="pl-6"
                          >
                            <Image
                              src={item.src}
                              alt={item.alt}
                              className="pointer-events-none mr-2 inline-flex"
                              width={15}
                              height={15}
                            />
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pokemon Height */}
                  <div className="space-y-2">
                    <Label className="text-sm">Height</Label>
                    <div className="flex items-center justify-between">
                      {PokemonHeight.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={item.key} />
                          <Label htmlFor={item.key}>{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pokemon Weight */}
                  <div className="space-y-2">
                    <Label className="text-sm">Weight</Label>
                    <div className="flex items-center justify-between">
                      {PokemonWeight.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={item.key} />
                          <Label htmlFor={item.key}>{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <SheetClose asChild>
                  <div className="flex space-x-4 pt-4">
                    <Button className="flex-1">Apply Filters</Button>
                    <Button variant="outline" className="flex-1">
                      Reset Filters
                    </Button>
                  </div>
                </SheetClose>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
