import Message from "./message";
import { getTableData } from "@/services/getTableData";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import DebugBox from "./debug-box";

export default async function Home() {
  const data = await getTableData();
  return (
    <main className="pt-4 md:pt-8 space-y-4 md:space-y-8">
      <Message delegateData={data} />
      {data ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
