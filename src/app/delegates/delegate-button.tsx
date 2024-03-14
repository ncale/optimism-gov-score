'use client';

import { Button } from "@/components/ui/button";
import { useAccount, useWriteContract } from "wagmi";
import { opContractAbi } from "@/config/op-contract-abi";
import { OP_CONTRACT_ADDRESS } from "@/config/config";

export default function DelegateButton({ delegateeAddr }: { delegateeAddr: `0x${string}` }) {
	
	const { isConnected, address } = useAccount()
	const { writeContract } = useWriteContract()

	function handleClick() {
		// writeContract({
		// 	abi: opContractAbi,
		// 	address: OP_CONTRACT_ADDRESS,
		// 	functionName: 'delegate',
		// 	account: address,
		// 	args: [delegateeAddr ?? "0x"],
		// 	chainId: 11155420 // optimism sepolia
		// })
	}

	return (
		<Button asChild size="xs" disabled={!isConnected}>
			<a href={`https://vote.optimism.io/delegates/${delegateeAddr}`} target="_blank">delegate</a>
		</Button>
	)
}