"use client";

import { useAccount, useReadContract, useEnsName, useEnsAvatar } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { DelegateTableRow } from "./columns";
import { DelegateCard } from "./card-components";
import { useQuery } from "@tanstack/react-query";
import { getEnsData } from "@/services/getEnsData";

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
        You haven&apos;t delegated any OP
      </div>
    );
  }

  if (!delegateData) return <pre>Error... Missing Data</pre>;

  const delegate = delegateData.find(
    (delegate) =>
      delegate.metadata__address.toLowerCase() === delegateAddress.toLowerCase()
  );

  if (!delegate)
    return (
      <div className="flex flex-col items-center justify-center my-8 mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2">
        This is unexpected...
      </div>
    );

  return (
    <DelegateCard
      address={delegateAddress}
      scores={delegate.metadata__scores}
      govScore={delegate.gov_score}
    />
  );
}
