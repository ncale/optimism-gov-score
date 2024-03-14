import { PREV_TEN_PROPOSAL_IDS, OP_VOTING_ADDRESS } from "@/config/config";
import { opVotingAbi } from "@/config/op-voting-abi";
import { readContract } from 'wagmi/actions';
import { wagmiConfig } from "@/components/Providers";

export async function readVotes(address: `0x${string}`) {
	let voteCount = 0
	const prop1 = [PREV_TEN_PROPOSAL_IDS[0]]
	prop1.forEach(async (propId) => {
		// // const { data: hasVoted } = await readContract(wagmiConfig, {
		// // 	address: OP_VOTING_ADDRESS,
		// // 	abi: opVotingAbi,
		// // 	functionName: "hasVoted",
		// // 	args: [propId, address],
		// // 	chainId: 10
		// // })
		// if (hasVoted) voteCount++
	})
	return voteCount
}