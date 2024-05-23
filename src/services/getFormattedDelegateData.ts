import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { Address, formatEther } from "viem";
import { Scores, calcGovScore, type GovScoreConfig } from "@/lib/utils";

export async function getFormattedDelegateData() {
  console.log("Starting getTableData...");

  const delegateData = await getAllDelegates();

  const currentVotableOP = "87424148000000000000000000"; // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(BigInt(currentVotableOP)));

  if (!delegateData) return undefined;

  const formattedData = delegateData.map((delegate, i) => {
    const votingPower_num = Number(formatEther(BigInt(delegate.votingPower)));
    const pct_voting_power = votingPower_num / currentVotableOP_num;

    const votes = delegate.votes.items.map((vote) => ({
      prop: vote.proposalId,
      withReason: vote.withReason,
    }));
    // remove unrelated props
    const qualifyingVotes = votes.filter((vote) =>
      QUALIFYING_PROPOSAL_IDS.includes(vote.prop),
    );
    // remove duplicate props
    const finalProps = qualifyingVotes.reduce(
      (reasons, vote) =>
        reasons.set(
          vote.prop,
          vote.withReason || (reasons.get(vote.prop) ?? false),
        ),
      new Map<string, boolean>(),
    );

    const recent_votes = finalProps.size;
    let counter = 0;
    finalProps.forEach((val) => (val ? counter++ : counter));
    const recent_votes_with_reason = counter;

    const govScoreConfig: GovScoreConfig = {
      recentParticipation: recent_votes,
      pctDelegation: pct_voting_power,
      isEnsNameSet: !!delegate.ensName,
      isEnsAvatarSet: !!delegate.ensAvatar,
      recentParticipationWithReason: recent_votes_with_reason,
    };
    const { govScore, scores } = calcGovScore(govScoreConfig);

    return {
      address: delegate.address,
      ensName: delegate.ensName,
      ensAvatar: delegate.ensAvatar,
      govScore: govScore,
      scores: scores,
      votingPower: votingPower_num,
      pctVotingPower: pct_voting_power,
      recentVotes: recent_votes,
      recentVotesWithReason: recent_votes_with_reason,
      testingData: delegate,
    } as FormattedDelegate;
  });

  return formattedData;
}

export type FormattedDelegate = {
  address: Address;
  ensName: `${string}.eth` | null;
  ensAvatar: string | null;
  govScore: number;
  scores: Scores;
  votingPower: number;
  pctVotingPower: number;
  recentVotes: number;
  recentVotesWithReason: number;
  testingData: any;
};
