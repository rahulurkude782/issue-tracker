import React from "react";
import routes from "./constants/routes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex space-x-5 h-14 border-b items-center px-5 mb-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {routes.map((link) => (
          <li key={link.label}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
