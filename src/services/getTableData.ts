import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { formatEther } from "viem";
import {
  RecommendationPercentageConfig,
  calcGovScore,
  calcRecommendationPercentage,
  type GovScoreConfig,
} from "@/lib/utils";

export async function getTableData() {
  console.log("Starting getTableData...");

  const delegateData = await getAllDelegates();

  const currentVotableOP = "87424148000000000000000000"; // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(BigInt(currentVotableOP)));

  if (!delegateData) return undefined;

  const tableData = delegateData.map((delegate, i) => {
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
      isEnsNameSet: !!delegate.ensName,
      isEnsAvatarSet: !!delegate.ensAvatar,
      recentParticipationWithReason: recent_votes_with_reason,
    };
    const { govScore, scores } = calcGovScore(govScoreConfig);

    const vpc =
      pct_voting_power >= 0.03
        ? 0
        : pct_voting_power >= 0.02
          ? 0.33
          : pct_voting_power >= 0.01
            ? 0.66
            : 1;
    const recPctConfig: RecommendationPercentageConfig = {
      govScore: govScore,
      votingPowerCoefficient: vpc,
    };
    const recPct = calcRecommendationPercentage(recPctConfig);

    return {
      rank: i + 1,
      delegate: `${delegate.address} - ${delegate.ensName}`,
      metadata__address: delegate.address,
      metadata__ens_name: delegate.ensName,
      metadata__ens_avatar: delegate.ensAvatar,
      recommendation_percentage: recPct,
      gov_score: govScore,
      metadata__scores: scores,
      voting_power: votingPower_num,
      pct_voting_power: pct_voting_power,
      recent_votes: recent_votes,
      recent_votes_with_reason: recent_votes_with_reason,
      testing__data: delegate,
    } as DelegateTableRow;
  });

  return tableData;
}
