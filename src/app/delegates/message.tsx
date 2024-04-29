"use client";

import { useAccount, useEnsName, useReadContract } from "wagmi";
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
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });
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
      <div className="flex flex-col items-center justify-center mx-auto p-4 text-center bg-muted rounded-md border w-11/12 md:w-1/2">
        You haven&apos;t delegated OP
      </div>
    );
  }

  if (!delegateData) return <pre>Error... Missing Data</pre>;

  const delegate = delegateData.find(
    (delegate) =>
      delegate.metadata__address.toLowerCase() ===
      delegateAddress.toLowerCase(),
  );

  if (!delegate)
    return (
      <div className="flex flex-col items-center rounded-md border justify-center mx-auto p-4 text-center bg-muted w-11/12 md:w-1/2">
        Error - Your delegate isn&apos;t in our list. We apologize for the
        inconvenience and are working on a solution
      </div>
    );

  const formattedOpBalance = opBalance ? formatEther(opBalance) : null;

  return (
    <div className="mx-auto space-y-2 w-11/12 md:w-[36rem]">
      <div className="flex space-x-2">
        {ensName ? (
          <div className="py-2 px-4 rounded-xl border font-medium">
            {ensName}
          </div>
        ) : (
          <></>
        )}
        {formattedOpBalance ? (
          <div className="py-2 px-4 rounded-xl border">
            <OPBalanceCard balance={formattedOpBalance} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="py-2 px-4 rounded-md border gap-1.5">
        {delegate ? <DelegateCard delegate={delegate} /> : <></>}
      </div>
    </div>
  );
}
