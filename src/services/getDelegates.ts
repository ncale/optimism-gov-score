import { fetchDuneData } from "@/services/dune";
import type { FormattedDelegate } from "@/types/serverTypes";
import { readVotes } from "./readVotes";

export async function getDelegates() {
	const duneData = await fetchDuneData()
	if (!duneData) return
	const formattedDelegateData = Promise.all(duneData.map(async (delegate) => {
		const voteCount = await readVotes(delegate.delegate)
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