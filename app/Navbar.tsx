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
import Skeleton from "@/app/components/Skeleton";

const Navbar = () => {
  return (
    <nav className="border-b px-5 py-4 mb-5">
      <Container>
        <Flex justify={"between"}>
          <Flex gap={"4"} align={"center"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathName = usePathname();
  return (
    <ul className="flex space-x-5">
      {routes.map((link) => (
        <li key={link.label}>
          <Link
            className={clsx({
              "nav-links": true,
              "!text-zinc-900": link.href === pathName,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} />;

  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-links">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
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
    </Box>
  );
};

export default Navbar;
