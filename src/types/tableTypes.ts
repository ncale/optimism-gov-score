export type DelegateTableRow = {
	rank: number
	address: string
	username: string
	pfpLink?: string
	voting_power: number
	pct_voting_power: number
	pct_participation?: number
	gov_score?: number
	is_current_delegate?: boolean
}