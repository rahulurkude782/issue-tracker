"use client";

import React from "react";
import routes from "./constants/routes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex space-x-5 h-14 border-b items-center px-5 mb-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {routes.map((link) => (
          <li key={link.label}>
            <Link
              className={clsx({
                "text-zinc-900": link.href === pathName,
                "text-zinc-500": link.href !== pathName,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
