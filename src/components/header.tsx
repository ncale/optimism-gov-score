import { Navbar, NavbarBrand, Image } from "@nextui-org/react";
import { NavLinks, NavConnectButton } from "./nav-items";
import Link from "next/link";

export default function Header() {
  return (
    <Navbar isBordered height="6rem" maxWidth="full">
      <NavbarBrand>
        <Link href={"/"} className="flex flex-col items-start">
          <Image
            src={"/optimism-logo.png"}
            alt="optimism logo"
            width={225}
            height={31}
            className="h-5 w-auto md:h-6"
            radius="none"
          />
          <h1 className="text-xl text-inherit md:text-2xl">GovScore</h1>
        </Link>
      </NavbarBrand>

      <NavLinks />

      <NavConnectButton />
    </Navbar>
  );
}
