"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { IconHamburger } from "./icons/lucide-icons";
import { useAccount, useReadContract } from "wagmi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { opTokenAbi } from "@/config/op-token-abi";
import { formatEther } from "viem";
import posthog from "posthog-js";

export function NavLinks() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const currentPath = usePathname();
  return isDesktop ? (
    <div className="flex justify-center space-x-4 tracking-wide">
      <div>
        <Link
          href="/faq"
          color="foreground"
          className={currentPath === "/faq" ? "font-bold" : ""}
        >
          FAQ
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link
          href="/delegates"
          color="foreground"
          className={currentPath === "/delegates" ? "font-bold" : ""}
        >
          Delegates
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
}

export function NavConnectButton() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const currentPath = usePathname();

  const { address } = useAccount();
  const { data: opBalance } = useReadContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: "balanceOf",
    args: [address ?? "0x"],
    chainId: 10,
  });
  const formattedOpBalance = opBalance
    ? Math.round(Number(formatEther(opBalance)))
    : null;

  if (address)
    posthog.capture("Page loaded w/connected address", { property: address });

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="flex h-10 items-center space-x-2">
        {formattedOpBalance ? (
          <div className="hidden rounded-xl bg-secondary px-2 py-1 font-bold text-secondary-foreground shadow-rainbow md:block">
            You have: {formattedOpBalance} OP
          </div>
        ) : null}
        <ConnectButton
          chainStatus="none"
          showBalance={false}
          accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
        />
      </div>
      {isDesktop ? null : (
        <div className="flex items-center">
          <Drawer direction="top">
            <DrawerTrigger>
              <IconHamburger />
            </DrawerTrigger>
            <DrawerContent>
              <ul className="mt-6 flex flex-col">
                <li className="ml-2 text-3xl">
                  <Link
                    href="/faq"
                    color="foreground"
                    className={`${
                      currentPath === "/faq" ? "font-bold" : ""
                    } p-1 text-3xl`}
                  >
                    FAQ
                  </Link>
                </li>
                <li className="ml-2 text-3xl">
                  <Link
                    href="/delegates"
                    color="foreground"
                    className={`${
                      currentPath === "/delegates" ? "font-bold" : ""
                    } p-1 text-3xl`}
                  >
                    Delegates
                  </Link>
                </li>
              </ul>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
}
