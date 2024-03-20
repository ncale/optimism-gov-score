import { Navbar, NavbarBrand, Image } from "@nextui-org/react";
import { NavLinks, NavConnectButton } from "./nav-items";

export default function Header() {
	return (
		<Navbar isBordered height="6rem" maxWidth="full">
			<NavbarBrand className="flex flex-col items-start">
        <Image 
					src={"/optimism-logo.png"} 
					alt="optimism logo"
					width={225}
					height={31}
					className="h-6 w-auto"
					radius="none" />
				<h1 className="text-2xl text-inherit">GovScore</h1>
      </NavbarBrand>

      <NavLinks />
			
			<NavConnectButton />
		</Navbar>
	)
}