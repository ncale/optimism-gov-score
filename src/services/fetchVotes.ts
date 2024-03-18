import { PREV_TEN_PROPOSAL_IDS, OP_VOTING_ADDRESS } from "@/config/config";
import { opVotingAbi } from "@/config/op-voting-abi";
import { readContract } from 'wagmi/actions';

export async function fetchVotes() {
	let voteCount = 0
	const prop1 = [PREV_TEN_PROPOSAL_IDS[0]]

	

	prop1.forEach(async (propId) => {
		// // const { data: hasVoted } = await readContract(config, {
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