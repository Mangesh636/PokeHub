import Link from "next/link";

import { NavLinks } from "@/constants";

export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="my-auto flex w-full flex-col gap-4 text-center text-sm">
      <ul className="flex justify-center gap-6 md:hidden">
        {/* Navigation Links */}
        {NavLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              prefetch
              className="text-black hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="bg-muted py-2">
        &copy; {date} PokéHub. All rights reserved.
      </div>
    </footer>
  );
};
