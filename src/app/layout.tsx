import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const Exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PokéHub",
    default: "PokéHub",
  },
  description:
    "An Pokedex clone built using Next.JS, Tailwind CSS, TypeScript & PokeApi.",
  applicationName: "PokéHub",
  keywords: ["Pokedex, PokéHub, PokeVault, Pokemon"],
  authors: [{ name: "Mangesh Bhardwaj", url: "https://mangesh636.github.io/" }],
  creator: "Mangesh Bhardwaj",
  openGraph: {
    title: "PokéHub",
    description:
      "A Pokedex clone built using Next.JS, Tailwind CSS, TypeScript & PokeApi.",
    url: "http://localhost:3000/",
    siteName: "PokéHub",
    images: [
      {
        url: "http://localhost:3000/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "http://localhost:3000/og.png",
        width: 1800,
        height: 1600,
        alt: "PokéHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéHub",
    description:
      "A Pokedex clone built using Next.JS, Tailwind CSS, TypeScript & PokeApi.",
    creator: "@CodingMangeshYT",
    images: ["http://localhost:3000/og.png"],
  },
  alternates: {
    canonical: "http://localhost:3000/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("text-base font-normal antialiased", Exo2.className)}>
        <Header />
        <main className="mx-auto max-w-screen-md px-4 py-6 md:max-w-screen-xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
