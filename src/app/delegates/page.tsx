import Message from "./message";
import { getTableData } from "@/services/getTableData";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import DebugBox from "./debug-box";

export default async function Home() {
  const data = await getTableData();
  return (
    <main className="mx-auto w-fit space-y-4 py-4 md:space-y-8 md:pt-8">
      <Message />
      {data ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
