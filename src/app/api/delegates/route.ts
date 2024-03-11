import { NextRequest } from "next/server";
import { Dune } from 'dune-api-client'
import { DUNE_API_KEY, DUNE_DELEGATE_QUERY_ID } from "@/utils/config";

export async function GET(request: NextRequest) {
	const res = await getDuneData()
	return res
}

export async function getDuneData() {
	const dune = new Dune(DUNE_API_KEY)

	const execute = await dune.execute(DUNE_DELEGATE_QUERY_ID)
	const res = await dune.results<DuneDelegateData>(execute.execution_id)
}

interface DuneDelegateData {
	primary_ens_name?: string
	address: string
	pfp?: string
	voting_power: number
	percent_delegated_supply: number
	percent_participation: number
}
