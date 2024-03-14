'use client';

import { useAccount, useReadContract, useEnsName, useEnsAvatar } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { normalize } from "viem/ens";
import { OP_VOTING_ADDRESS } from "@/config/config";
import { opVotingAbi } from "@/config/op-voting-abi";
import { calcGovScore } from "@/lib/utils";
import { GovScoreConfig } from "@/types/utilsTypes";
// import { countParticipation } from "./count-participation-cell";

export default function Message() {
	
	const { address } = useAccount()
	const { data: delegateAddress } = useReadContract({
		address: OP_TOKEN_ADDRESS,
		abi: opTokenAbi,
		functionName: "delegates",
		args: [address ?? "0x"],
		chainId: 10
	})

	const { data: ensName } = useEnsName({
		address: address,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})
	// const voteCount = address ? countParticipation(address) : 0

	// const govScoreConfig: GovScoreConfig = {
	// 	isEnsNameSet: (typeof ensName === 'string' && ensName.length > 0),
	// 	isEnsAvatarSet: (typeof ensAvatar === 'string' && ensAvatar.length > 0),
	// 	isFcAcctAttached: true, // dummy data
	// 	recentParticipation: voteCount,
	// 	pctDelegation: 0.5,
	// }

	// const { scores } = calcGovScore(govScoreConfig)
	// const govScore = Object.values(scores).reduce((a, b) => a + b, 0);

	if (!address) return <p className="delegate-recommendation">Connect your wallet to see your delegate</p>
	if (!delegateAddress) return <p className="delegate-recommendation">No data found...</p>

	const message = 'this is broken. fix me later'
	// const message = `Your delegate has a GovScore of ${govScore}/10. ${govScore > 7 ? "Awesome" : "Consider re-delegating..."}`

	return (
		<p className="delegate-recommendation">{message}</p>
	)
}