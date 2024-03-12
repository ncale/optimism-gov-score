"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Delegate = {
	rank: number
	address: string
	username: string
	pfpLink?: string
	voting_power: number
	pct_voting_power: number
	pct_participation?: number
	gov_score?: number
	is_current_delegate?: boolean
}

function formatBigNumber(num: number) {
	const formattedNum = new Intl.NumberFormat().format(num);
	return formattedNum
}

export const columns: ColumnDef<Delegate>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
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
  },
	{
    accessorKey: "pct_participation",
    header: "% Participation",
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
