import { getDelegates } from "@/services/getDelegates";
import { DataTable } from "./data-table";
import { columns, type DelegateTableRow } from "./columns";
import Message from "./message";

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
				count_participation: row.count_participation,
				gov_score: 0, // temporary hard-coded value
				is_current_delegate: false, // temporary hard-coded value
			} as DelegateTableRow
		})
		return rows
	}
}

export default async function Home() {
	const data = await getData()
	return (
		<main className="main">
			<Message delegateData={data} />
			{data ? <DataTable columns={columns} data={data} /> : null}
		</main>
	);
}