"use client";

// Components
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { LuArrowUpDown } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";
import { LuCheckCircle2 } from "react-icons/lu";
import { LuMinusCircle } from "react-icons/lu";
import { LuXCircle } from "react-icons/lu";
import Link from "next/link";

const columnHelper = createColumnHelper<DelegateTableRow>()

export const columns = [
	columnHelper.accessor('rank', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<div className="head col-rank mr-1">Rank</div>
					<FilterIcon />
				</Button>
			)
		},
		cell: ({ row }) => <div className="cell col-rank">{row.getValue('rank')}</div>,
	}),
	columnHelper.accessor((delegate) => `${delegate.address} - ${delegate.username}`, {
		id: 'address',
		header: () => <div className="head col-delegate">Delegate</div>,
		cell: (props) => <DelegateCell props={props} />
	}),
	columnHelper.accessor('gov_score', {
		header: () => <GovScoreHeader />,
		cell: ({ row }) => <GovScoreCell row={row} />
	}),
	columnHelper.accessor('voting_power', {
		header: () => <div className="head">Voting Power</div>,
		cell: ({ row }) => {
			const num = formatBigNumber(row.getValue('voting_power'))
			return <div className="cell">{`${num} OP`}</div>
		}
	}),
	columnHelper.accessor('pct_voting_power', {
		header: () => <div className="head col-pct-votes">% of Voting Power</div>,
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_voting_power'))
			return <div className="cell col-pct-votes">{num}</div>
		}
	}),
	columnHelper.accessor('count_participation', {
		header: () => <div className="head col-participation">Recent Participation</div>,
		cell: ({ row }) => {
			const isUser = (new RegExp('0x').test(row.original.address.toLowerCase()))
			const voteCount = row.getValue('count_participation')
			return isUser ? <div className="cell col-participation">{`${voteCount}/10 votes`}</div> : <div className="cell col-participation">n/a</div>
		}
	}),
	columnHelper.accessor('is_current_delegate', {
		header: () => <></>,
		cell: ({ row }) => row.getValue('is_current_delegate') ? (
			<div className="cell">current delegate</div>
		) : (
			<div className="cell w-20"><DelegateButton newDelegateeAddr={row.original.address}/></div>
		),
	}),
] as ColumnDef<DelegateTableRow>[]

export type DelegateTableRow = {
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
	const isUser = (new RegExp('0x').test(addr.toLowerCase()))
	const abbrevAddress = `${addr.slice(0, 5)}...${addr.slice(-4)}`
	return (
		<>
			{isUser ? (
			<a href={`https://vote.optimism.io/delegates/${props.row.original.address}`} target="_blank">
				<div className="cell col-delegate flex w-56">
					<Avatar>
						{ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
						<AvatarFallback className="bg-ens-grad" />
					</Avatar>
					<div className="flex flex-col ml-2 items-start justify-center">
						<h3 className="">{ensName ? ensName : abbrevAddress}</h3>
					</div>
				</div>
			</a>
			) : (
				<div className="cell col-delegate flex flex-col ml-2 items-start justify-center">
					<h3 className="">{addr}</h3>
				</div>
			)}
		</>
	)
}

function GovScoreHeader() {
	return (
		<div className="head col-gov-score flex items-center gap-1 mr-1">
			<div>GovScore</div>
			<Tooltip content={
				<div>
					<div className="info-tooltip">
						<span className="line mb-1">An opinionated score of delegate quality. </span> 
						<span className="line mb-1">A high govscore means a delegate <span className="special">votes consistently</span>, has a <span className="special">transparent onchain identity</span>, and is not <span className="special">too powerful</span>. </span>
						<Link href='/thesis' className="special link">read more</Link>
					</div>
				</div>
			}>
				<span className="cursor-pointer"><HelpIcon /></span>
			</Tooltip>
		</div>
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
				return "More than 1.0%"
			case 2:
				return "More than 0.5%"
			case 3:
				return "Less than 0.5%"
		}
	}
	const pctDelegationText = getPctDelegationText(scores.pctDelegation)
	return (
		<div className="cell col-gov-score">
			{(new RegExp('0x').test(row.original.address)) ? (
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
				<span className="cursor-pointer">{`${govScore}/10`}</span>
			</Tooltip>) : (
				<span>n/a</span>
			)}
		</div>
	)
}

export function FilterIcon() {
	return (
		<IconContext.Provider value={{ size: '1.15em'}}>
			<LuArrowUpDown />
		</IconContext.Provider>
	)
}
export function HelpIcon() {
	return (
		<IconContext.Provider value={{ size: '0.9em'}}>
			<LuHelpCircle />
		</IconContext.Provider>
	)
}
export function CheckIcon() {
	return (
		<IconContext.Provider value={{ color: "green", size: "1.15em" }}>
			<LuCheckCircle2 />
		</IconContext.Provider>
	)
}
export function EmptyIcon() {
	return (
		<IconContext.Provider value={{ color: "orange", size: "1.15em" }}>
			<LuMinusCircle />
		</IconContext.Provider>
	)
}
export function XMarkIcon() {
	return (
		<IconContext.Provider value={{ color: "red", size: "1.15em" }}>
			<LuXCircle />
		</IconContext.Provider>
	)
}
export function ScorePill({ score }: { score: number}) {
	return (
		<div className={`rounded-full text-xs text-center w-6 h-4 bg-gray-600 text-white font-bold`}>
			{score}
		</div>
	);
};