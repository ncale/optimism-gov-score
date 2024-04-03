import { getEnsData } from "@/services/getEnsData";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" });
  }
  const [ensName, ensAvatar] = await getEnsData(address);
  return NextResponse.json({ ensName, ensAvatar });
}
