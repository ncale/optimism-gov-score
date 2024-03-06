import DelegateTable from "@/components/DelegateTable";

export default function Home() {
  return (
		<main className="w-3/4 m-auto">
			<p className="text-center my-4">Your delegate has a GovScore of 6/10. Consider re-delegating</p>
			<DelegateTable />
		</main>
	);
}