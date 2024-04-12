import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { formatEther } from "viem";
import { calcGovScore, type GovScoreConfig } from "@/lib/utils";

export async function getTableData() {
  console.log("Starting getTableData...");

  const delegateData = await getAllDelegates();

  const currentVotableOP = BigInt("87424148000000000000000000"); // as of 4/11/24
  const currentVotableOP_num = Number(formatEther(currentVotableOP));

  if (!delegateData) return undefined;

  const tableData = delegateData.map((row, i) => {
    const votingPower_num = Number(formatEther(BigInt(row.votingPower)));
    const pct_voting_power = votingPower_num / currentVotableOP_num;

    const proposalsVotedOn = row.votes.items.map((vote) => vote.proposalId);
    const nonDuplicateVotes = [...Array.from(new Set(proposalsVotedOn))];
    const recent_participation = nonDuplicateVotes.filter((proposal) => {
      return QUALIFYING_PROPOSAL_IDS.includes(BigInt(proposal));
    }).length;

    const govScoreConfig: GovScoreConfig = {
      isEnsNameSet: !!row.ensName,
      isEnsAvatarSet: !!row.ensAvatar,
      recentParticipation: recent_participation,
      pctDelegation: pct_voting_power,
    };
    const { govScore, scores } = calcGovScore(govScoreConfig);

    return {
      rank: i + 1,
      delegate: `${row.address} - ${row.ensName}`,
      metadata__address: row.address,
      metadata__ens_name: row.ensName,
      metadata__ens_avatar: row.ensAvatar,
      gov_score: govScore,
      metadata__scores: scores,
      voting_power: votingPower_num,
      pct_voting_power: pct_voting_power,
      recent_participation: recent_participation,
    } as DelegateTableRow;
  });

  return tableData;
}
