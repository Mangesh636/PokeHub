import Link from "next/link";
import Image from "next/image";
import { Fredoka } from "next/font/google";

import { cn } from "@/lib/utils";
import { FooterSocials } from "@/constants";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AboutPage() {
  return (
    <section className="flex select-none min-h-screen flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={"/logo.png"}
          className="pointer-events-none h-32 w-32 rounded-full"
          alt="Logo PokeHub"
          width={250}
          height={250}
          priority
        />
        <h1 className={cn("text-2xl", fredoka.className)}>About PokéHub</h1>
        <p className="w-3/4 text-center text-xl">
          PokéHub is a community-driven platform that allows Pokémon enthusiasts
          to share, discover, and discuss their favorite Pokémon. Whether
          you&apos;re a seasoned trainer or just starting your journey, PokéHub
          provides a space for everyone to connect and explore the Pokémon
          universe.
        </p>
      </div>

      <div className="my-6 flex flex-col items-center justify-between">
        <span className={cn("mb-5 text-center text-lg", fredoka.className)}>
          PokéHub is Powered by&#58;
        </span>
        <div className="flex flex-row items-center justify-between gap-12">
          <Link href={"https://pokeapi.co/"}>
            <Image
              src={"/pokeapi.svg"}
              alt="Pokeapi logo"
              width={150}
              height={150}
              className="pointer-events-none"
            />
          </Link>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-row items-center justify-between gap-6">
        {FooterSocials.map((item) => (
          <Link key={item.label} href={item.href} target="_blank">
            <span className="sr-only">{item.label}</span>
            <item.icon />
          </Link>
        ))}
      </div>
    </section>
  );
}
