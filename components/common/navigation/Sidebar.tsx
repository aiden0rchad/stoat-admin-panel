"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  HomeIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Heading, Separator } from "@radix-ui/themes";

import { AuthorisedUserCard } from "./AuthorisedUserCard";

export function Sidebar({
  modules,
}: {
  modules: {
    hr: boolean;
    advancedPanel: boolean;
    modAgent: boolean;
    discoverAgent: boolean;
  };
}) {
  const pathname = usePathname();

  const params = useSearchParams();
  if (params.has("hideNav")) return null;

  return (
    <div className="sidebar-container">
      <Flex gap="2" direction="column" className="w-[260px] p-3">
        <Flex align="center" gap="2" className="px-2 py-3">
          <Image
            src="/wide.svg"
            width={200}
            height={28}
            alt="Stoat Admin"
          />
        </Flex>

        <AuthorisedUserCard />

        <Separator size="4" className="my-1 opacity-20" />

        <Heading size="1" className="sidebar-section-label">
          Navigation
        </Heading>

        <Button
          variant={pathname === "/panel" ? "solid" : "ghost"}
          className="sidebar-nav-btn !justify-start"
          asChild
        >
          <Link href="/panel">
            <HomeIcon /> Dashboard
          </Link>
        </Button>

        <Separator size="4" className="my-1 opacity-20" />

        <Heading size="1" className="sidebar-section-label">
          Tools
        </Heading>

        <Button
          variant={
            pathname === "/panel/revolt/inspect" ? "solid" : "ghost"
          }
          className="sidebar-nav-btn !justify-start"
          asChild
        >
          <Link href="/panel/revolt/inspect">
            <MagnifyingGlassIcon />
            Search & Inspect
          </Link>
        </Button>

        <div className="mt-auto pt-4 px-2">
          <Flex direction="column" gap="1">
            <Separator size="4" className="mb-2 opacity-10" />
            <span className="sidebar-footer-text">
              Stoat Admin Panel
            </span>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
