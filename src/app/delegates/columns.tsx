"use client";

// Components
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip } from "@nextui-org/react";
import DelegateButton from "./delegate-button";
// Hooks
import { useEnsName, useEnsAvatar } from "wagmi";
// Helper functions
import { formatBigNumber, formatPercentValue, calcGovScore } from "@/lib/utils";
import { normalize } from "viem/ens";
// Types
import type { CellContext, Row } from "@tanstack/react-table";
// Icons
import { IconContext } from "react-icons/lib";
import { LuCheckCircle2 } from "react-icons/lu";
import { LuMinusCircle } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";

const columnHelper = createColumnHelper<DelegateTableRow>()

export const columns = [
	columnHelper.accessor('rank', {
		header: () => <div className="head col-rank">Rank</div>,
		cell: ({ row }) => <div className="cell col-rank">{row.getValue('rank')}</div>,
	}),
	columnHelper.accessor((delegate) => `${delegate.address} - ${delegate.username}`, {
		id: 'address',
		header: () => <div className="head col-delegate">Delegate</div>,
		cell: (props) => <DelegateCell props={props} />
	}),
	columnHelper.accessor('gov_score', {
		header: () => <div className="head col-gov-score">GovScore</div>,
		cell: ({ row }) => <GovScoreCell row={row} />
	}),
	columnHelper.accessor('voting_power', {
		header: () => <div className="head">Voting Power</div>,
		cell: ({ row }) => {
			const num = formatBigNumber(row.getValue('voting_power')).split('.')[0]
			return <div className="cell">{`${num} OP`}</div>
		}
	}),
	columnHelper.accessor('pct_voting_power', {
		header: () => <div className="head">% of Voting Power</div>,
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_voting_power'))
			return <div className="cell">{num}</div>
		}
	}),
	columnHelper.accessor('count_participation', {
		header: () => <div className="head">Recent Participation</div>,
		cell: ({ row }) => {
			const voteCount = row.getValue('count_participation')
			return <div className="cell">{`${voteCount}/10 votes`}</div>
		}
	}),
	columnHelper.accessor('is_current_delegate', {
		header: () => <div className="head">Delegate?</div>,
		cell: ({ row }) => row.getValue('is_current_delegate') ? (
			<div className="cell">current delegate</div>
		) : (
			<div className="cell"><DelegateButton delegateeAddr={row.original.address} /></div>
		)
	}),
] as ColumnDef<DelegateTableRow>[]

type DelegateTableRow = {
	rank: number
	address: `0x${string}`
	username: string
	pfpLink?: string
	voting_power: number
	pct_voting_power: number
	count_participation: number
	gov_score?: number
	is_current_delegate?: boolean
}

function DelegateCell({ props }: { props: CellContext<DelegateTableRow, string> }) {
	const { data: ensName } = useEnsName({
		address: props.getValue().split(' - ')[0] as `0x${string}`,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})
	const [addr, username] = props.getValue().split(' - ')
	const shortAddr = `${addr.slice(0, 5)}...${addr.slice(-4)}`
	return (
		<a href={`https://vote.optimism.io/delegates/${props.row.original.address}`} target="_blank">
			<div className="cell col-delegate flex">
				<Avatar>
					<AvatarImage src={ensAvatar ? String(ensAvatar) : "/def-avatar.jpg"} />
					<AvatarFallback>...</AvatarFallback>
				</Avatar>
				<div className="flex flex-col ml-2 items-start justify-center">
					<h3 className="">{ensName ? ensName : shortAddr}</h3>
				</div>
			</div>
		</a>
	)
}

function GovScoreCell({ row }: { row: Row<DelegateTableRow> }) {
	const { data: ensName } = useEnsName({
		address: row.original.address,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})
	const voteCount = row.original.count_participation
	const govScoreConfig = {
		isEnsNameSet: (typeof ensName === 'string' && ensName.length > 0),
		isEnsAvatarSet: (typeof ensAvatar === 'string' && ensAvatar.length > 0),
		isFcAcctAttached: false, // dummy data
		recentParticipation: voteCount,
		pctDelegation: row.original.pct_voting_power,
	}
	const { scores } = calcGovScore(govScoreConfig)
	const govScore = Object.values(scores).reduce((a, b) => a + b, 0)
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
							<span className="line">Voted in <span className="special">{voteCount}</span> of last <span className="special">10</span> onchain proposals</span>
						</div>
						<div className="tooltip-text">
							{scores.pctDelegation === 3 ? <CheckIcon /> : (scores.pctDelegation > 0 ? <EmptyIcon /> : <XMarkIcon />)}
							<ScorePill score={scores.pctDelegation} />
							<span className="line">{pctDelegationText} of total delegated OP</span>
						</div>
					</div>
				}
			>
				<span>{`${govScore}/10`}</span>
			</Tooltip>
		</div>
	)
}

function CheckIcon() {
	return (
		<IconContext.Provider value={{ color: "green", size: "1.15em" }}>
			<LuCheckCircle2 />
		</IconContext.Provider>
	)
}
function EmptyIcon() {
	return (
		<IconContext.Provider value={{ color: "orange", size: "1.15em" }}>
			<LuMinusCircle />
		</IconContext.Provider>
	)
}
function XMarkIcon() {
	return (
		<IconContext.Provider value={{ color: "red", size: "1.15em" }}>
			<LuXCircle />
		</IconContext.Provider>
	)
}
function ScorePill({ score }: { score: number}) {
	return (
		<div className={`rounded-full text-xs text-center w-6 h-4 bg-gray-600 text-white font-bold`}>
			{score}
		</div>
	);
};