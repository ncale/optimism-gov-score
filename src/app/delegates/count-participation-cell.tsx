import { useReadContract } from "wagmi";
import { OP_VOTING_ADDRESS, PREV_TEN_PROPOSAL_IDS } from "@/config/config";
import { opVotingAbi } from "@/config/op-voting-abi";
import { type Row } from "@tanstack/react-table";
import { type DelegateTableRow } from "@/types/tableTypes";

export function useCountParticipation(address: `0x${string}`) {
	const { data: hasVoted1 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[0], address],
	})
	const { data: hasVoted2 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[1], address],
	})
	const { data: hasVoted3 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[2], address],
	})
	const { data: hasVoted4 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[3], address],
	})
	const { data: hasVoted5 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[4], address],
	})
	const { data: hasVoted6 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[5], address],
	})
	const { data: hasVoted7 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[6], address],
	})
	const { data: hasVoted8 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[7], address],
	})
	const { data: hasVoted9 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[8], address],
	})
	const { data: hasVoted10 } = useReadContract({
		address: OP_VOTING_ADDRESS,
		abi: opVotingAbi,
		functionName: "hasVoted",
		args: [PREV_TEN_PROPOSAL_IDS[9], address],
	})
	let voteCount = 0
	if (hasVoted1) voteCount ++
	if (hasVoted2) voteCount ++
	if (hasVoted3) voteCount ++
	if (hasVoted4) voteCount ++
	if (hasVoted5) voteCount ++
	if (hasVoted6) voteCount ++
	if (hasVoted7) voteCount ++
	if (hasVoted8) voteCount ++
	if (hasVoted9) voteCount ++
	if (hasVoted10) voteCount ++
	return voteCount
}

export default function CountParticipationCell({ row }: { row: Row<DelegateTableRow>}) {
	const voteCount = useCountParticipation(row.original.address)
	return <div className="cell line-through text-slate-400">{`${voteCount}/10`}</div>
}