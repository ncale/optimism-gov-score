'use client';

import { useAccount, useReadContract } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";

export default function Message() {
	
	const { address } = useAccount()
	const { data: delegateAddress } = useReadContract({
		address: OP_TOKEN_ADDRESS,
		abi: opTokenAbi,
		functionName: "delegates",
		args: [address ?? "0x"]
	})

	if (!address) return <p className="delegate-recommendation">Connect your wallet to see your delegate</p>
	if (!delegateAddress) return <p className="delegate-recommendation">No data found...</p>

	const message = `Your delegate has a GovScore of ${9}/10. ${9>7 ? "Awesome" : "Consider re-delegating..."}` // dummy data

	return (
		<p className="delegate-recommendation">{message}</p>
	)
}