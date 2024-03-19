"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DelegateTableRow } from "@/types/tableTypes";
import { formatBigNumber, formatPercentValue } from "@/lib/utils";
import DelegateButton from "./delegate-button";
import DelegateCell from "./delegate-cell";
import GovScoreCell from "./gov-score-cell";

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