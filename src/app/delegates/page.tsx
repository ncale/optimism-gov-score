import { DataTable } from "./data-table";
import { columns } from "./columns";
import Message from "./message";
import { getTableData } from "@/services/getTableData";

export default async function Home() {
  const data = await getTableData();
  return (
    <main className="main">
      <Message delegateData={data} />
      {data ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
