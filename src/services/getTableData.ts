import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { formatEther } from "viem";
import {
  GovScoreConfig,
  PowerFactorConfig,
  ActivityFactorConfig,
  calculateGovScore,
  calculatePowerFactor,
  calculateActivityFactor,
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

    // Calculate activity factor
    const activityFactorConfig: ActivityFactorConfig = {
      recentParticipation: recent_votes,
      isEnsNameSet: !!delegate.ensName,
      isEnsAvatarSet: !!delegate.ensAvatar,
      recentParticipationWithReason: recent_votes_with_reason,
    };
    const activityFactorResult = calculateActivityFactor(activityFactorConfig);

    // Calculate power factor
    const powerFactorConfig: PowerFactorConfig = {
      pct_voting_power: pct_voting_power,
    };
    const powerFactorResult = calculatePowerFactor(powerFactorConfig);

    // Calculate govscore
    const govScoreConfig: GovScoreConfig = {
      activityFactor: activityFactorResult.value,
      powerFactor: powerFactorResult.value,
    };
    const govScoreResult = calculateGovScore(govScoreConfig);

    return {
      rank: i + 1,
      delegate: `${delegate.address} - ${delegate.ensName}`,
      metadata__address: delegate.address,
      metadata__ens_name: delegate.ensName,
      metadata__ens_avatar: delegate.ensAvatar,
      activity_factor: activityFactorResult.value,
      metadata__activity_factor_details: activityFactorResult.details,
      power_factor: powerFactorResult.value,
      metadata__power_factor_details: powerFactorResult.details,
      gov_score: govScoreResult.value,
      metadata__gov_score_details: null, // Data WIP
      voting_power: votingPower_num,
      pct_voting_power: pct_voting_power,
      recent_votes: recent_votes,
      recent_votes_with_reason: recent_votes_with_reason,
      testing__data: delegate,
    } as DelegateTableRow;
  });

  return tableData;
}
