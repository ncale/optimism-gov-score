"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { formatBigNumber, formatPercentValue } from "@/lib/utils";
import DelegateButton from "./delegate-button";
import GovScoreCell from "./gov-score-cell";
import { useEnsName, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { CellContext } from "@tanstack/react-table";

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
			return <div className="cell">{`${voteCount}/10`}</div>
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