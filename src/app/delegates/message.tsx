'use client';

import { useAccount, useReadContract, useEnsName, useEnsAvatar } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { normalize } from "viem/ens";
import { calcGovScore } from "@/lib/utils";
import { DelegateTableRow } from "./columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Message({ data }: { data: DelegateTableRow[] | undefined }) {
	
	const { address } = useAccount()
	const { data: delegateAddress } = useReadContract({
		address: OP_TOKEN_ADDRESS,
		abi: opTokenAbi,
		functionName: "delegates",
		args: [address ?? "0x"],
		chainId: 10
	})

	const { data: ensName } = useEnsName({
		address: delegateAddress,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})

	if (!address) return (
		<div className="delegate-recommendation">
				Connect wallet to see your delegate
		</div>
	)
	const burnAddress = new RegExp('0x0000000000')
	if (!delegateAddress || (burnAddress.test(delegateAddress))) return (
		<div className="delegate-recommendation">
			You haven&apos;t delegated any OP... <a 
				href="https://app.uniswap.org/explore/tokens/optimism/0x4200000000000000000000000000000000000042" 
				className="special link">buy some?</a>
		</div>
	)

	let govScore = 0
	if (data) {
		const delegate = data.find((delegate) => delegate.address === delegateAddress)
		const govScoreConfig = {
			isEnsNameSet: (typeof ensName === 'string' && ensName.length > 0),
			isEnsAvatarSet: (typeof ensAvatar === 'string' && ensAvatar.length > 0),
			isFcAcctAttached: false, // dummy data
			recentParticipation: delegate?.count_participation ?? 0,
			pctDelegation: delegate?.pct_voting_power ?? 0,
		}
		const { scores } = calcGovScore(govScoreConfig)
		govScore = Object.values(scores).reduce((a, b) => a + b, 0);
	}

	const message = `${ensName ? ensName : 'Your delegate'} has a GovScore of ${govScore}/10. ${govScore > 7 ? "Awesome 😎" : "Consider re-delegating..."}`
	const shortAddr = `${delegateAddress.slice(0, 5)}...${delegateAddress.slice(-4)}`

	return (
		<div className="delegate-recommendation flex flex-col items-center justify-center">
			<a 
				href={`https://vote.optimism.io/delegates/${delegateAddress}`} 
				target="_blank"
				className="flex items-center mb-1 text-xl font-bold">
				<div className="mr-2">Your delegate:</div>
				<Avatar>
					{ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
					<AvatarFallback />
				</Avatar>
				<div className="ml-2">
					<h3 className="">{ensName ? ensName : shortAddr}</h3>
				</div>
			</a>
			<p className="">{message}</p>
		</div>
	)
}