export interface DuneDelegateQuery {
	delegate_rank: number
	delegate: `0x${string}`
	delegate_name_raw: string
	dt_voting_power: number
	pct_voting_power: number
}

export interface DelegateResWithVotes extends DuneDelegateQuery {
	votes: Vote[]
}

export interface Vote {
	proposalId: string
	blockNum: string
}