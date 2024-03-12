import { NextResponse } from "next/server";
import { fetchDuneData } from "@/services/dune";

export async function GET() {
	const delegates = await getDelegates();
	return NextResponse.json(delegates)
}

async function getDelegates() {
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
