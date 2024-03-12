"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DelegateTableRow } from "@/types/tableTypes";
import { formatBigNumber, formatPercentValue } from "@/lib/utils";

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
    header: "Voting Power",
		cell: ({ row }) => {
			const num = formatBigNumber(row.getValue('voting_power'))
			return <div>{`${num} OP`}</div>
		}
  },
	{
    accessorKey: "pct_voting_power",
    header: "% of Voting Power",
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_voting_power'))
			return <div>{num}</div>
		}
  },
	{
    accessorKey: "pct_participation",
    header: "% Participation",
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_participation'))
			return <div>{num}</div>
		}
  },
	{
    accessorKey: "gov_score",
    header: "GovScore",
  },
	{
		accessorKey: "is_current_delegate",
    header: "Delegate?",
  },
]
