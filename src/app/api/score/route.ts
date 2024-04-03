import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { getEnsData } from "@/services/getEnsData";
import { calcGovScore } from "@/lib/utils";
import { getData } from "@/services/getData";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // parse url param and validate format
  const address = req.nextUrl.searchParams.get("address");
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" });
  }

  // get ens data
  const [ensName, ensAvatar] = await getEnsData(address);
  // get delegate data
  const allDelegateData = await getData(address);
  const delegateData = allDelegateData?.find(
    (delegate) => delegate.address.toLowerCase() === address.toLowerCase()
  );

  const govScoreConfig = {
    isEnsNameSet: !!ensName,
    isEnsAvatarSet: !!ensAvatar,
    isFcAcctAttached: false, // dummy data, borrowed from message.tx
    recentParticipation: delegateData?.count_participation || 0,
    pctDelegation: delegateData?.pct_voting_power || 0,
  };

  const { scores } = calcGovScore(govScoreConfig);
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return NextResponse.json({ scores, govScore });
}
