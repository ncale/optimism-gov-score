export interface DuneDelegateQuery {
	delegate_rank: number
	delegate: string
	delegate_name_raw: string
	dt_voting_power: number
	pct_voting_power: number
}

export interface FormattedDelegate {
	rank: number
	address: `0x${string}`
	username: string
	voting_power: number
	pct_voting_power: number
}