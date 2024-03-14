"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DelegateTableRow } from "@/types/tableTypes";
import { formatBigNumber, formatPercentValue } from "@/lib/utils";
import DelegateButton from "./delegate-button";
import { useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const columnHelper = createColumnHelper<DelegateTableRow>()

export const columns = [
	columnHelper.accessor('rank', {
		header: () => <div className="head col-rank">Rank</div>,
		cell: ({ row }) => <div className="cell col-rank">{row.getValue('rank')}</div>,
	}),
	columnHelper.accessor((delegate) => `${delegate.address} - ${delegate.username}`, {
		id: 'address',
		header: () => <div className="head col-delegate">Delegate</div>,
		cell: (props) => {
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
				<div className="cell col-delegate flex">
					<Avatar>
						<AvatarImage src={ensAvatar ? String(ensAvatar) : "/def_avatar.png"} />
						<AvatarFallback>...</AvatarFallback>
					</Avatar>
					<div className="flex flex-col ml-2 items-start justify-center">
						<h3 className="">{ensName ? ensName : shortAddr}</h3>
						{(addr === username) ? (
							<></>
						) : (
							<p className="">a.k.a. {username}</p>
						)}
					</div>
				</div>
			)
		}
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
	columnHelper.accessor('pct_participation', {
		header: () => <div className="head">% Participation</div>,
		cell: ({ row }) => {
			const num = formatPercentValue(row.getValue('pct_participation'))
			return <div className="cell">{num}</div>
		}
	}),
	columnHelper.accessor('gov_score', {
		header: () => <div className="head">GovScore</div>,
		cell: ({ row }) => <div className="cell">{row.getValue('gov_score')}</div>
	}),
	columnHelper.accessor('is_current_delegate', {
		header: () => <div className="head">Delegate?</div>,
		cell: ({ row }) => row.getValue('is_current_delegate') ? (
			<div className="cell">current delegate</div>
		) : (
			<div className="cell"><DelegateButton delegateeAddr={row.original.address} /></div>
		)
	}),
]