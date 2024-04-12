import FeedbackFlag from "@/components/feedback-flag";
import Message from "./message";
import { getTableData } from "@/services/getTableData";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Home() {
  const data = await getTableData();
  return (
    <main className="main">
      <FeedbackFlag />
      <Message delegateData={data} />
      {data ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
