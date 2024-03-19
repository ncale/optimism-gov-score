import { Dune } from 'dune-api-client'
import { DUNE_API_KEY, DUNE_DELEGATE_QUERY_ID } from "@/config/config";

export async function fetchDuneData() {
	const dune = new Dune(DUNE_API_KEY)
	const res = await dune.results<QueryResponse>(DUNE_DELEGATE_QUERY_ID)
	if (res.result) return res.result.rows
}

// Response type
export interface QueryResponse {
	delegate_rank: number
	delegate: `0x${string}`
	delegate_name_raw: string
	dt_voting_power: number
	pct_voting_power: number
}