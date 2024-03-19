"use client";

import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from "next/navigation";

export function NavLinks() {
	const currentPath = usePathname();
	return (
		<NavbarContent className="hidden sm:flex gap-4 tracking-wide" justify="center">
			<NavbarItem className="text-xl">
				<Link href="/" color="foreground" className={currentPath === "/" ? "font-bold" : ""}>
					Thesis
				</Link>
			</NavbarItem>
			<NavbarItem className="text-xl">|</NavbarItem>
			<NavbarItem className="text-xl">
				<Link href="/delegates" color="foreground" className={currentPath === "/delegates" ? "font-bold" : ""}>
					Delegates
				</Link>
			</NavbarItem>
		</NavbarContent>
	)
}

export function NavConnectButton() {
	return (
		<NavbarContent justify="end">
			<NavbarItem>
				<ConnectButton chainStatus="none" showBalance={false} />
			</NavbarItem>
		</NavbarContent>
	)
}