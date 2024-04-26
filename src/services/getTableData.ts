import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { formatEther } from "viem";
import { calcGovScore, type GovScoreConfig } from "@/lib/utils";

export async function getTableData() {
  console.log("Starting getTableData...");

  const delegateData = await getAllDelegates();

  const currentVotableOP = "87424148000000000000000000"; // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(BigInt(currentVotableOP)));

  if (!delegateData) return undefined;

  const tableData = delegateData.map((delegate, i) => {
    const votingPower_num = Number(formatEther(BigInt(delegate.votingPower)));
    const pct_voting_power = votingPower_num / currentVotableOP_num;

    const proposals = delegate.votes.items.map((vote) => vote.proposalId);
    const votes = delegate.votes.items.map((vote) => ({
      prop: vote.proposalId,
      withReason: vote.withReason,
    }));
    const nonDupeVotes = votes.filter(
      (vote, index) => proposals.indexOf(vote.prop) === index,
    );

    const qualifying_votes = nonDupeVotes.filter((proposal) => {
      return QUALIFYING_PROPOSAL_IDS.includes(proposal.prop);
    });

    const recent_participation = qualifying_votes.length;
    const recent_participation_with_reason = qualifying_votes.filter(
      (vote) => vote.withReason,
    ).length;

    const govScoreConfig: GovScoreConfig = {
      recentParticipation: recent_participation,
      pctDelegation: pct_voting_power,
      isEnsNameSet: !!delegate.ensName,
      isEnsAvatarSet: !!delegate.ensAvatar,
      recentParticipationWithReason: recent_participation_with_reason,
    };
    const { govScore, scores } = calcGovScore(govScoreConfig);

    return {
      rank: i + 1,
      delegate: `${delegate.address} - ${delegate.ensName}`,
      metadata__address: delegate.address,
      metadata__ens_name: delegate.ensName,
      metadata__ens_avatar: delegate.ensAvatar,
      gov_score: govScore,
      metadata__scores: scores,
      voting_power: votingPower_num,
      pct_voting_power: pct_voting_power,
      recent_participation: recent_participation,
      metadata__vote_list_1: delegate.votes.items,
      metadata__vote_list_2: proposals,
      metadata__vote_list_3: votes,
      metadata__vote_list_4: nonDupeVotes,
      recent_participation_with_reason: recent_participation_with_reason,
    } as DelegateTableRow;
  });

  return tableData;
}
