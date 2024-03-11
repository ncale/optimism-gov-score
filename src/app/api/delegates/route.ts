import { NextRequest } from "next/server";
import { Dune } from 'dune-api-client'
import { DUNE_API_KEY, DUNE_QUERY_ID } from "@/utils/config";

export async function GET(request: NextRequest) {
	const res = await getDuneData()
	return res
}

export async function getDuneData() {
	const dune = new Dune(DUNE_API_KEY)

	const execute = await dune.execute(DUNE_QUERY_ID)
	const res = await dune.results(execute.execution_id)
}
