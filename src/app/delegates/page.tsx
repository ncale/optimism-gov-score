import Message from "./message";
import { getTableData } from "@/services/getTableData";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Home() {
  const data = await getTableData();
  return (
    <main className="space-y-4 py-4 md:space-y-8 md:pt-8">
      <Message delegateData={data} />
      {data ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
