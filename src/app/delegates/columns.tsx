"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DelegateTableRow } from "@/types/tableTypes";
import { calcGovScore, formatBigNumber, formatPercentValue } from "@/lib/utils";
import DelegateButton from "./delegate-button";
import { useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip } from "@nextui-org/react";
import ScoreCircle from "./score-circle";
import CountParticipationCell, { countParticipation } from "./count-participation-cell";

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
				<a href={`https://vote.optimism.io/delegates/${props.row.original.address}`} target="_blank">
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
				</a>
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
	columnHelper.accessor('count_participation', {
		header: () => <div className="head">Recent Participation</div>,
		cell: ({ row }) => <CountParticipationCell row={row} />
	}),
	columnHelper.accessor('gov_score', {
		header: () => <div className="head">GovScore</div>,
		cell: ({ row }) => {
			const { data: ensName } = useEnsName({
				address: row.original.address,
				chainId: 1
			})
			const { data: ensAvatar } = useEnsAvatar({
				name: normalize(ensName?.toString() ?? ''),
				chainId: 1
			})

			const voteCount = countParticipation(row.original.address)

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