"use client";

import { useAccount, useReadContract, useEnsName, useEnsAvatar } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { calcGovScore } from "@/lib/utils";
import { DelegateTableRow } from "./columns";
import DelegateCard from "./delegate-card";
import { normalize } from "viem/ens";

export default function Message({
  delegateData,
}: {
  delegateData: DelegateTableRow[] | undefined;
}) {
  const { address } = useAccount();
  const { data: delegateAddress } = useReadContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: "delegates",
    args: [address ?? "0x"],
    chainId: 10,
  });
  const { data: ensName } = useEnsName({
    address: delegateAddress,
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize(ensName?.toString() ?? ""),
    chainId: 1,
  });

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center my-8 mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2 shadow-sm">
        Connect wallet to see your delegate
      </div>
    );
  }

  if (!delegateAddress || new RegExp("0x000000000000").test(delegateAddress)) {
    return (
      <div className="flex flex-col items-center justify-center my-8 mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2 shadow-sm">
        You haven&apos;t delegated any OP...{" "}
        <a
          href="https://app.uniswap.org/explore/tokens/optimism/0x4200000000000000000000000000000000000042"
          className="special link"
        >
          buy some?
        </a>
      </div>
    );
  }

  if (!delegateData) return <pre>Error... Missing Data</pre>;

  const delegate = delegateData.find(
    (delegate) =>
      delegate.address.toLowerCase() === delegateAddress.toLowerCase()
  );

  if (!delegate)
    return (
      <div className="flex flex-col items-center justify-center my-8 mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2">
        uh oh... your delegate isn&apos;t here. This is unexpected, but
        we&apos;ll do our best to fix it. Please send your feedback to
        ncale.eth, and we&apos;ll get working on it asap. Your feedback is
        extremely valued as we iron out the kinks in this new site, and we
        appreciate your patience as we get off the ground. Thanks!
      </div>
    );

  const govScoreConfig = {
    isEnsNameSet: typeof ensName === "string" && ensName.length > 0,
    isEnsAvatarSet: typeof ensAvatar === "string" && ensAvatar.length > 0,
    isFcAcctAttached: false, // dummy data
    recentParticipation: delegate.count_participation,
    pctDelegation: delegate.pct_voting_power,
  };
  const { scores, govScore } = calcGovScore(govScoreConfig);

  return (
    <DelegateCard
      address={delegateAddress}
      scores={scores}
      govScore={govScore}
    />
  );
}
