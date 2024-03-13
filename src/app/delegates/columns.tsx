"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DelegateTableRow } from "@/types/tableTypes";
import { formatBigNumber, formatPercentValue } from "@/lib/utils";
import DelegateButton from "./delegate-button";

export const columns: ColumnDef<DelegateTableRow>[] = [
  {
    accessorKey: "rank",
    header: () => <div className="text-center">Rank</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('rank')}</div>
		}
  },
  {
    accessorKey: "username",
    header: "Delegate",
  },
  {
    accessorKey: "voting_power",
		header: () => <div className="text-center">Voting Power</div>,
		cell: ({ row }) => {
			const num = formatBigNumber(row.getValue('voting_power'))
			return <div className="text-center">{`${num} OP`}</div>
		}
  },
	{
    accessorKey: "pct_voting_power",
		header: () => <div className="text-center">% of Voting Power</div>,
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_voting_power'))
			return <div className="text-center">{num}</div>
		}
  },
	{
    accessorKey: "pct_participation",
    header: () => <div className="text-center">% Participation</div>,
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_participation'))
			return <div className="text-center">{num}</div>
		}
  },
	{
    accessorKey: "gov_score",
    header: () => <div className="text-center">GovScore</div>,
		cell: ({ row }) => <div className="text-center">{row.getValue('gov_score')}</div>
  },
	{
		accessorKey: "is_current_delegate",
		header: () => <div className="text-center">Delegate?</div>,
		cell: ({ row }) => row.getValue('is_current_delegate') ? (
			<div className="text-center">current delegate</div>
		) : (
			<div className="text-center"><DelegateButton /></div>
		)
  },
]
