import { useEnsName, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { calcGovScore } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import ScoreCircle from "./score-pill";
import { type Row } from "@tanstack/react-table";
import { type DelegateTableRow } from "@/types/tableTypes";
// Icons
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import ScorePill from "./score-pill";

export default function GovScoreCell({ row }: { row: Row<DelegateTableRow> }) {
	const { data: ensName } = useEnsName({
		address: row.original.address,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})

	const voteCount = (row.original.count_participation)

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
		<div className="cell col-gov-score">
			<Tooltip 
				placement="right"
				content={
					<div>
						<div className="tooltip-text">
							{scores.ensName === 1 ? <FaRegCircleCheck /> : <FaRegCircleXmark />}
							<ScorePill score={scores.ensName} />
							<span className="line">{govScoreConfig.isEnsNameSet ? "" : "No "} ENS Primary Name Set</span>
						</div>
						<div className="tooltip-text">
							{scores.ensAvatar === 1 ? <FaRegCircleCheck /> : <FaRegCircleXmark />}
							<ScorePill score={scores.ensAvatar} />
							<span className="line">{govScoreConfig.isEnsAvatarSet ? "" : "No "} ENS Avatar Set</span>
						</div>
						{/* <div className="tooltip-text">
							<ScoreCircle num={scores.fcAcct} />
							[WIP] {govScoreConfig.isFcAcctAttached ? "" : "No "} Detected Farcaster Account
						</div> */}
						<div className="tooltip-text">
							{scores.recentParticipation > 3.5 ? <FaRegCircleCheck /> : (scores.recentParticipation > 1.5 ? <FaRegCircle /> : <FaRegCircleXmark />)}
							<ScorePill score={scores.recentParticipation} />
							<span className="line">Voted in <span className="special">{voteCount}</span> of last <span className="special">10</span> onchain proposals</span>
						</div>
						<div className="tooltip-text">
							{scores.pctDelegation === 3 ? <FaRegCircleCheck /> : (scores.pctDelegation > 0 ? <FaRegCircle /> : <FaRegCircleXmark />)}
							<ScorePill score={scores.pctDelegation} />
							<span className="line">{pctDelegationText} of total delegated OP</span>
						</div>
					</div>
				}
			>
				<span>{`${govScore}/5`}</span>
			</Tooltip>
		</div>
	)
}