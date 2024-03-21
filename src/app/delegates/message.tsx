'use client';

import { useAccount, useReadContract, useEnsName, useEnsAvatar } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { normalize } from "viem/ens";
import { calcGovScore } from "@/lib/utils";
import { CheckIcon, DelegateTableRow, EmptyIcon, ScorePill, XMarkIcon } from "./columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip } from "@nextui-org/react";

export default function Message({ delegateData }: { delegateData: DelegateTableRow[] | undefined }) {
	
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

	if (!delegateData) return <pre>Error... Missing Data</pre>

	const delegate = delegateData.find((delegate) => delegate.address.toLowerCase() === delegateAddress.toLowerCase())

	if (!delegate) return (
		<div className="delegate-recommendation">
			uh oh... your delegate isn&apos;t here. This is unexpected, but we&apos;ll do our best to fix it. 
			Please send your feedback to ncale.eth, and we&apos;ll get working on it asap. Your feedback 
			is extremely valued as we iron out the kinks in this new site, and we appreciate your
			patience as we get off the ground. Thanks!</div>
	)

	const delegate = data.find((delegate) => delegate.address === delegateAddress)

	const govScoreConfig = {
		isEnsNameSet: (typeof ensName === 'string' && ensName.length > 0),
		isEnsAvatarSet: (typeof ensAvatar === 'string' && ensAvatar.length > 0),
		isFcAcctAttached: false, // dummy data
		recentParticipation: delegate.count_participation,
		pctDelegation: delegate.pct_voting_power,
	}
	const { scores } = calcGovScore(govScoreConfig)
	const govScore = Object.values(scores).reduce((a, b) => a + b, 0);
	function getPctDelegationText(score: number) {
		switch (score) {
			case 0:
				return "More than 1.5%"
			case 1: 
				return "More than 1.0%"
			case 2:
				return "More than 0.5%"
			case 3:
				return "Less than 0.5%"
		}
	}
	const pctDelegationText = getPctDelegationText(scores.pctDelegation)
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
					<AvatarFallback className="bg-ens-grad" />
				</Avatar>
				<div className="ml-2">
					<h3 className="">{ensName ? ensName : shortAddr}</h3>
				</div>
			</a>
			<p>
				{ensName ? ensName : 'Your delegate'} has a GovScore of
				<Tooltip 
					placement="right"
					content={
						<div>
							<div className="tooltip-text">
								{scores.ensName === 1 ? <CheckIcon /> : <XMarkIcon />}
								<ScorePill score={scores.ensName} />
								<span className="line">{govScoreConfig.isEnsNameSet ? "" : "No "} ENS Primary Name Set</span>
							</div>
							<div className="tooltip-text">
								{scores.ensAvatar === 1 ? <CheckIcon /> : <XMarkIcon />}
								<ScorePill score={scores.ensAvatar} />
								<span className="line">{govScoreConfig.isEnsAvatarSet ? "" : "No "} ENS Avatar Set</span>
							</div>
							{/* <div className="tooltip-text">
								<ScoreCircle num={scores.fcAcct} />
								[WIP] {govScoreConfig.isFcAcctAttached ? "" : "No "} Detected Farcaster Account
							</div> */}
							<div className="tooltip-text">
								{scores.recentParticipation > 3.5 ? <CheckIcon /> : (scores.recentParticipation > 1.5 ? <EmptyIcon /> : <XMarkIcon />)}
								<ScorePill score={scores.recentParticipation} />
								<span className="line">Voted in <span className="special">{delegate?.count_participation ?? 0}</span> of last <span className="special">10</span> onchain proposals</span>
							</div>
							<div className="tooltip-text">
								{scores.pctDelegation === 3 ? <CheckIcon /> : (scores.pctDelegation > 0 ? <EmptyIcon /> : <XMarkIcon />)}
								<ScorePill score={scores.pctDelegation} />
								<span className="line">{pctDelegationText} of total delegated OP</span>
							</div>
						</div>
					}
				>
					<span className="cursor-pointer"> {govScore}/10. </span>
				</Tooltip>
				{govScore > 6 ? "Awesome 😎" : "Consider re-delegating..."}
			</p>
		</div>
	)
}
