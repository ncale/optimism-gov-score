import DelegateTable from "@/components/DelegateTable";

export default function Home() {
  return (
		<main className="main">
			<p className="delegate-recommendation">Your delegate has a GovScore of 6/10. Consider re-delegating</p>
			<DelegateTable />
		</main>
	);
}