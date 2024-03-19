import { type Row } from "@tanstack/react-table";
import { type DelegateTableRow } from "@/types/tableTypes";

export default function CountParticipationCell({ row }: { row: Row<DelegateTableRow>}) {
	const voteCount = row.getValue('count_participation')
	return <div className="cell">{`${voteCount}/10`}</div>
}