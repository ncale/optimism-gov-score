import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";

export default function DelegateButton() {
	
	const { isConnected } = useAccount()

	return (
		<Button size="xs" disabled={!isConnected}>delegate</Button>
	)
}