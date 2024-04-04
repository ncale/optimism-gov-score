"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";

export default function DelegateButton({
  newDelegateAddress,
}: {
  newDelegateAddress: `0x${string}`;
}) {
  const { isConnected, address } = useAccount();
  const { data: delegateAddress } = useReadContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: "delegates",
    args: [address ?? "0x"],
    chainId: 10,
  });
  const { writeContract } = useWriteContract();

  const isCurrentDelegate = delegateAddress
    ? newDelegateAddress.toLowerCase() === delegateAddress.toLowerCase()
    : false;

  function handleClick() {
    writeContract({
      abi: opTokenAbi,
      address: OP_TOKEN_ADDRESS,
      functionName: "delegate",
      account: address,
      args: [newDelegateAddress],
      chainId: 10,
    });
  }

  return (
    <>
      {isConnected ? (
        <div className="w-20">
          <Button
            size="xs"
            disabled={isCurrentDelegate}
            onClick={handleClick}
            variant="secondary"
            className="hover:scale-105 hover:bg-blue-200 origin-center ease-in-out duration-75 active:shadow-inner active:bg-blue-400"
          >
            <div>redelegate</div>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
