"use client";

import Link from "next/link";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { NavLinks } from "@/constants";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
});

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="mx-auto max-w-screen-sm lg:max-w-screen-2xl">
      <nav className="mx-auto flex max-w-screen-md items-center justify-between border-b border-b-gray-400/25 px-6 py-3 md:max-w-screen-xl">
        {/* PokeHub Logo */}
        <Link href={"/"} className="inline-flex flex-row-reverse gap-3">
          <span className={cn("text-black", fredoka.className)}>PokéHub</span>
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={25}
            height={25}
            className="pointer-events-none"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden flex-row items-center gap-6 md:flex">
          {NavLinks.map((item) => (
            <li key={item.href}>
              <Link
                prefetch
                href={item.href}
                className={cn(
                  "hover:text-black",
                  pathname === item.href ? "text-black" : "text-gray-600/80",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sidebar */}
        <Sidebar />
      </nav>
    </header>
  );
};
