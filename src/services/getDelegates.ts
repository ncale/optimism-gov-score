import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { fetchDuneData } from "@/services/dune";
import { fetchVotes } from "@/services/fetchVotes";
import { DelegateResWithVotes, Vote } from "@/types/serverTypes";

export async function getDelegates() {
	
	const duneData = await fetchDuneData()
	const votes = await getAllVotes()
	if (!duneData || !votes) return

	console.log('response data received')

	const combinedData = duneData.map((delegate) => {
		let voteList = [] as Vote[]
		votes.forEach((delegateVotes) => {
			if (delegate.delegate.toLowerCase() === delegateVotes.address.toLowerCase()) {
				voteList = delegateVotes.votes.items
			}
		})
		return { ...delegate, votes: voteList } as DelegateResWithVotes
	})

	const formattedDelegateData = Promise.all(combinedData.map(async (delegate) => {
		
		// let voteCount = 0
		// if (delegate.votes.length) {
		// 	delegate.votes.forEach((vote) => {
		// 		if (QUALIFYING_PROPOSAL_IDS.includes(BigInt(vote.proposalId))) voteCount++
		// 	})
		// }

		// destructure the object into list
		const votes = delegate.votes.map((vote) => vote.proposalId)
		// filter unapplicable proposals
		const validVotes = votes.filter((vote) => QUALIFYING_PROPOSAL_IDS.includes(BigInt(vote)))
		// remove duplicates
		const validUniqueVotes = [...Array.from(new Set(validVotes))];

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

// Formatted result type
interface FormattedDelegate {
	rank: number
	address: `0x${string}`
	username: string
	voting_power: number
	pct_voting_power: number
	count_participation: number
}

async function getAllVotes() {

	const allVotes = []

	let votesPage = await fetchVotes()
	allVotes.push(...votesPage.items)
	while (votesPage.pageInfo.hasNextPage ?? false) {
		votesPage = await fetchVotes(votesPage.pageInfo.endCursor)
		allVotes.push(...votesPage.items)
	}
	return allVotes	
}