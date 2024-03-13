'use client';

import { useAccount } from "wagmi";

export default function Message() {
	
	const { address } = useAccount()
	
	const message = address ? "Your delegate has a GovScore of 6/10. Consider re-delegating... ".concat(address) : "Connect your wallet"

	return (
		<p className="delegate-recommendation">{message}</p>
	)
}