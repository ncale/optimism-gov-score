import { DataTable } from "./data-table";
import { columns } from "./columns";
import Message from "./message";
import { getData } from "@/services/getData";

export default async function Home() {
	const data = await getData()
	
	return (
		<main className="main">
			<Message delegateData={data} />
			{data ? <DataTable columns={columns} data={data} /> : null}
		</main>
	);
}