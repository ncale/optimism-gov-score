import { useEnsName, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { useCountParticipation } from "./count-participation-cell";
import { calcGovScore } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import ScoreCircle from "./score-circle";
import { type Row } from "@tanstack/react-table";
import { type DelegateTableRow } from "@/types/tableTypes";

export default function GovScoreCell({ row }: { row: Row<DelegateTableRow> }) {
	const { data: ensName } = useEnsName({
		address: row.original.address,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})

	const voteCount = useCountParticipation(row.original.address)

	const govScoreConfig = {
		isEnsNameSet: (typeof ensName === 'string' && ensName.length > 0),
		isEnsAvatarSet: (typeof ensAvatar === 'string' && ensAvatar.length > 0),
		isFcAcctAttached: false, // dummy data
		recentParticipation: voteCount,
		pctDelegation: row.original.pct_voting_power,
	}

	const { scores } = calcGovScore(govScoreConfig)
	const govScore = Object.values(scores).reduce((a, b) => a + b, 0);

	function getPctDelegationText(score: number) {
		switch (score) {
			case 0:
				return "More than 1.5%"
			case 1: 
				return "Less than 1.5%"
			case 2:
				return "Less than 1.0%"
			case 3:
				return "Less than 0.5%"
		}
	}
	const pctDelegationText = getPctDelegationText(scores.pctDelegation)

	return (
		<div className="cell">
			<Tooltip 
				placement="right"
				content={
					<div>
						<div className="tooltip-text">
							<ScoreCircle num={scores.ensName} />
							{govScoreConfig.isEnsNameSet ? "" : "No "} ENS Primary Name Set
						</div>
						<div className="tooltip-text">
							<ScoreCircle num={scores.ensAvatar} />
							{govScoreConfig.isEnsAvatarSet ? "" : "No "} ENS Avatar Set
						</div>
						{/* <div className="tooltip-text">
							<ScoreCircle num={scores.fcAcct} />
							[WIP] {govScoreConfig.isFcAcctAttached ? "" : "No "} Detected Farcaster Account
						</div> */}
						<div className="tooltip-text">
							<ScoreCircle num={scores.recentParticipation} />
							Voted in {voteCount} of last 10 onchain proposals
						</div>
						<div className="tooltip-text">
							<ScoreCircle num={scores.pctDelegation} />
							{pctDelegationText} of total delegated OP
						</div>
					</div>
				}
			>
				<span>{govScore}</span>
			</Tooltip>
		</div>
	)
}