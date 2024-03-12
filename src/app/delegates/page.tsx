// import DelegateTable from "@/components/DelegateTable";
import { rows } from "@/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Home() {
  return (
		<main className="main">
			<p className="delegate-recommendation">Your delegate has a GovScore of 6/10. Consider re-delegating</p>
			<DataTable columns={columns} data={rows} />
		</main>
	);
}