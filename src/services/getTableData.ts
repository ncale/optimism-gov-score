import { type DelegateTableRow } from "@/app/delegates/columns";
import { getAllDelegates } from "./getDelegateData";
import { QUALIFYING_PROPOSAL_IDS } from "@/config/config";
import { formatEther } from "viem";
import { calcGovScore, type GovScoreConfig } from "@/lib/utils";
import { getFormattedDelegateData } from "./getFormattedDelegateData";

export async function getTableData() {
  console.log("Starting getTableData...");

  const delegateData = await getFormattedDelegateData();
  if (!delegateData) return undefined;
  delegateData.sort((a, b) => {
    if (a.govScore !== b.govScore) {
      return b.govScore - a.govScore;
    } else {
      return b.votingPower - a.votingPower;
    }
  });
  const tableData = delegateData.map((delegate, i) => {
    return {
      rank: i + 1,
      delegate: `${delegate.address} - ${delegate.ensName}`,
      metadata__address: delegate.address,
      metadata__ens_name: delegate.ensName,
      metadata__ens_avatar: delegate.ensAvatar,
      gov_score: delegate.govScore,
      metadata__scores: delegate.scores,
      voting_power: delegate.votingPower,
      pct_voting_power: delegate.pctVotingPower,
      recent_votes: delegate.recentVotes,
      recent_votes_with_reason: delegate.recentVotesWithReason,
      testing__data: delegate.testingData,
    } as DelegateTableRow;
  });

  return tableData;
}
