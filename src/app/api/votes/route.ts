import { NextResponse } from "next/server";
import { fetchVotes } from "@/services/fetchVotes";

export async function GET() {
	const delegates = await fetchVotes();
	return NextResponse.json(delegates)
}
