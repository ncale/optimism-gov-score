import { NextResponse } from "next/server";
import { Dune } from 'dune-api-client'
import { DUNE_API_KEY, DUNE_DELEGATE_QUERY_ID } from "@/utils/config";

export async function GET() {
	const delegates = await getDelegates();
	return NextResponse.json(delegates)
}

export async function getDelegates() {
	const duneData = await fetchDuneData()
	if (!duneData) return
	const formattedDelegateData = duneData.map((delegate) => {
		return {
			rank: delegate.delegate_rank,
			address: delegate.delegate,
			username: delegate.delegate_name_raw,
			voting_power: delegate.dt_voting_power,
			pct_voting_power: delegate.pct_voting_power
		} as FormattedDelegate
	})
	return formattedDelegateData
}

interface FormattedDelegate {
	rank: number
	address: string
	username: string
	voting_power: number
	pct_voting_power: number
}

export async function fetchDuneData() {
	const dune = new Dune(DUNE_API_KEY)
	const res = await dune.results<DuneDelegateQuery>(DUNE_DELEGATE_QUERY_ID)
	if (res.result) return res.result.rows
}

interface DuneDelegateQuery {
	delegate_rank: number
	delegate: string
	delegate_name_raw: string
	dt_voting_power: number
	pct_voting_power: number
}
