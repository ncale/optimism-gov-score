import { getDelegates } from "@/services/getDelegates";
import type { DelegateTableRow } from "@/types/tableTypes";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
	const delegateData = await getDelegates();
	if (delegateData) {
		const rows = delegateData.map((row) => {
			return {
				rank: row.rank,
				address: row.address,
				username: row.username,
				pfpLink: '', // temporary hard-coded value
				voting_power: row.voting_power,
				pct_voting_power: row.pct_voting_power,
				pct_participation: 0, // temporary hard-coded value
				gov_score: 0, // temporary hard-coded value
				is_current_delegate: false, // temporary hard-coded value
			} as DelegateTableRow
		})
		return rows
	}
	return undefined
}

export default async function Home() {
  
	const data = await getData()
	
	return (
		<main className="main">
			<p className="delegate-recommendation">Your delegate has a GovScore of 6/10. Consider re-delegating</p>
			{data ? <DataTable columns={columns} data={data} /> : undefined}
		</main>
	);
}