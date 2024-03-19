import { fetchDuneData } from "@/services/fetchDuneData";
import { getAllVotes } from "@/services/fetchVotes";
import { DelegateResWithVotes, Vote } from "@/types/serverTypes";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";

export async function getDelegates() {
	// Fetch data
	const duneData = await fetchDuneData()
	const votes = await getAllVotes()
	if (!duneData || !votes) return
	// Combine to one object list
	const combinedData = duneData.map((delegate) => {
		let voteList = [] as Vote[]
		votes.forEach((delegateVotes) => {
			if (delegate.delegate.toLowerCase() === delegateVotes.address.toLowerCase()) {
				voteList = delegateVotes.votes.items
			}
		})
		return { ...delegate, votes: voteList } as DelegateResWithVotes
	})
	// Map to a formatted result
	const formattedDelegateData = Promise.all(combinedData.map(async (delegate) => {
		const votes = delegate.votes.map((vote) => vote.proposalId); // destructure into list
		const validVotes = votes.filter((vote) => QUALIFYING_PROPOSAL_IDS.includes(BigInt(vote))); // remove unapplicable proposals
		const validUniqueVotes = [...Array.from(new Set(validVotes))]; // remove duplicates
		const voteCount = validUniqueVotes.length
		return {
			rank: delegate.delegate_rank,
			address: delegate.delegate,
			username: delegate.delegate_name_raw,
			voting_power: delegate.dt_voting_power,
			pct_voting_power: delegate.pct_voting_power,
			count_participation: voteCount,
		} as FormattedDelegate
	}))
	return formattedDelegateData
}

// Result type
interface FormattedDelegate {
	rank: number
	address: `0x${string}`
	username: string
	voting_power: number
	pct_voting_power: number
	count_participation: number
}