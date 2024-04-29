import { NavLinks, NavConnectButton } from "./nav-items";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed z-50 grid h-24 w-full grid-cols-2 items-center border-b bg-background/[0.95] px-4 md:grid-cols-3">
      <div>
        <Link href={"/"} className="flex flex-col items-start">
          <Image
            src={"/optimism-logo.png"}
            alt="optimism logo"
            width={225}
            height={31}
            className="h-5 w-auto md:h-6"
          />
          <h1 className="text-xl text-inherit md:text-2xl">GovScore</h1>
        </Link>
      </div>

      <NavLinks />

      <NavConnectButton />
    </nav>
  );
}
