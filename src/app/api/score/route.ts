import { NextRequest, NextResponse } from "next/server";
import { formatEther, isAddress } from "viem";
import { findOneDelegate } from "@/services/getDelegateData";
import { GovScoreConfig, calcGovScore } from "@/lib/utils";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // parse url param and validate format
  const address = req.nextUrl.searchParams.get("address");
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" });
  }

  const res = await findOneDelegate(address);
  const delegate = res.data.delegates.items[0];

  // calculate percent of voting power
  const currentVotableOP = BigInt("87424148000000000000000000"); // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(currentVotableOP));
  const votingPower_num = Number(formatEther(BigInt(delegate.votingPower)));
  const pct_voting_power = votingPower_num / currentVotableOP_num;

  // calculate recent voting participation
  const proposalsVotedOn = delegate.votes.items.map((vote) => vote.proposalId);
  const nonDuplicateVotes = [...Array.from(new Set(proposalsVotedOn))];
  const recent_participation = nonDuplicateVotes.filter((proposal) => {
    return QUALIFYING_PROPOSAL_IDS.includes(BigInt(proposal));
  }).length;

  // combine and calculate govscore
  const govScoreConfig: GovScoreConfig = {
    isEnsNameSet: !!delegate.ensName,
    isEnsAvatarSet: !!delegate.ensAvatar,
    recentParticipation: recent_participation,
    pctDelegation: pct_voting_power,
  };
  const { govScore, scores } = calcGovScore(govScoreConfig);

  return NextResponse.json({ scores, govScore });
}
