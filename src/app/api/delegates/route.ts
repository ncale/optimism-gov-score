import { type DelegateTableRow } from "@/app/delegates/columns";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { GovScoreConfig, calcGovScore } from "@/lib/utils";
import {
  DelegateQueryResponse,
  findOneDelegate,
} from "@/services/getDelegateData";
import { NextRequest, NextResponse } from "next/server";
import { formatEther, isAddress } from "viem";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" });
  }
  return NextResponse.json({
    status: 500,
    message: "Server error. This endpoint is not currently maintained.",
  });
  // const delegate = await findOneDelegate(address);
  // const formattedData = formatResponse(delegate);
  // return NextResponse.json(formattedData);
}

function formatResponse(res: DelegateQueryResponse) {
  const currentVotableOP = BigInt("87424148000000000000000000"); // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(currentVotableOP));

  const delegate = res.data.delegates.items[0];

  const votingPower_num = Number(formatEther(BigInt(delegate.votingPower)));
  const pct_voting_power = votingPower_num / currentVotableOP_num;

  const proposalsVotedOn = delegate.votes.items.map((vote) => vote.proposalId);
  const nonDuplicateVotes = [...Array.from(new Set(proposalsVotedOn))];
  const recent_votes = nonDuplicateVotes.filter((proposal) => {
    return QUALIFYING_PROPOSAL_IDS.includes(proposal);
  }).length;

  const govScoreConfig: GovScoreConfig = {
    recentParticipation: recent_votes,
    pctDelegation: pct_voting_power,
    isEnsNameSet: !!delegate.ensName,
    isEnsAvatarSet: !!delegate.ensAvatar,
    recentParticipationWithReason: 0, // dummy data
  };
  const { govScore, scores } = calcGovScore(govScoreConfig);

  return {
    delegate: `${delegate.address} - ${delegate.ensName}`,
    metadata__address: delegate.address,
    metadata__ens_name: delegate.ensName,
    metadata__ens_avatar: delegate.ensAvatar,
    gov_score: govScore,
    metadata__scores: scores,
    voting_power: votingPower_num,
    pct_voting_power: pct_voting_power,
    recent_votes: recent_votes,
  } as DelegateTableRow;
}
