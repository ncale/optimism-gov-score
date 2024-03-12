import { NextResponse } from "next/server";
import { getDelegates } from "@/services/getDelegates";

export async function GET() {
	const delegates = await getDelegates();
	return NextResponse.json(delegates)
}
