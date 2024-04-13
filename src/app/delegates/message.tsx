"use client";

import { useAccount, useReadContract } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { DelegateTableRow } from "./columns";
import { OPBalanceCard, DelegateCard } from "./card-components";
import { formatEther } from "viem";

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
  const { data: opBalance } = useReadContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: "balanceOf",
    args: [address ?? "0x"],
    chainId: 10,
  });

  if (!address) {
    return <></>;
  }

  if (!delegateAddress || new RegExp("0x000000000000").test(delegateAddress)) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2 shadow-sm">
        You haven&apos;t delegated OP
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
      <div className="flex flex-col items-center justify-center mx-auto p-4 text-center bg-muted rounded w-11/12 md:w-1/2">
        This is unexpected...
      </div>
    );

  const formattedOpBalance = opBalance ? formatEther(opBalance) : null;

  return (
    <div className="flex flex-col mx-auto py-4 px-4 md:px-8 bg-muted rounded w-11/12 md:w-[36rem] gap-1.5 shadow-md">
      {formattedOpBalance ? (
        <OPBalanceCard balance={formattedOpBalance} />
      ) : (
        <></>
      )}
      {formattedOpBalance && delegate ? <hr /> : <></>}
      {delegate ? <DelegateCard delegate={delegate} /> : <></>}
    </div>
  );
}
