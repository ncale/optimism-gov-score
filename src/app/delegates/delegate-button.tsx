"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { opTokenAbi } from "@/config/op-token-abi";
import { OP_TOKEN_ADDRESS } from "@/config/config";

export default function DelegateButton({
  newDelegateeAddr,
}: {
  newDelegateeAddr: `0x${string}`;
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
    ? newDelegateeAddr.toLowerCase() === delegateAddress.toLowerCase()
    : false;

  const burnAddress = new RegExp("0x0000000000");
  const hasDelegate = delegateAddress
    ? !burnAddress.test(delegateAddress)
    : false;

  function handleClick() {
    writeContract({
      abi: opTokenAbi,
      address: OP_TOKEN_ADDRESS,
      functionName: "delegate",
      account: address,
      args: [newDelegateeAddr],
      chainId: 10,
    });
  }

  return (
    <Button
      size="xs"
      disabled={!isConnected || isCurrentDelegate || !hasDelegate}
      onClick={handleClick}
    >
      <div>redelegate</div>
    </Button>
  );
}
