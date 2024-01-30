"use client";

import React from "react";
import routes from "./constants/routes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="border-b px-5 py-4 mb-5">
      <Container>
        <Flex justify={"between"}>
          <Flex gap={"4"} align={"center"}>
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
          </Flex>
          <Flex>
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session!.user!.image!}
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="space-y-3">
                  <DropdownMenu.Label>
                    <Text size="2">{session!.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
