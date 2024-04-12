"use client";

import { Address } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";
import {
  CheckIcon,
  MinusIcon,
  XMarkIcon,
} from "@/components/icons/lucide-icons";
import { type Scores } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function DelegateCard({
  address,
  scores,
  govScore,
}: {
  address: Address;
  scores: Scores;
  govScore: number;
}) {
  // get ens data
  const { data: ensName } = useEnsName({
    address: address,
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize(ensName?.toString() ?? ""),
    chainId: 1,
  });

  const nameText = ensName
    ? ensName
    : `${address.slice(0, 5)}...${address.slice(-4)}`;

  return (
    <div className="flex flex-col items-left justify-center my-4 md:my-8 mx-auto py-4 px-4 md:px-8 text-left bg-muted rounded w-11/12 md:w-[28rem] gap-1.5 shadow-md">
      <div>Your delegate is...</div>
      <a
        href={`https://vote.optimism.io/delegates/${address}`}
        target="_blank"
        className="flex items-center text-lg md:text-2xl font-bold"
      >
        <Avatar className="h-14 w-14">
          {ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
          <AvatarFallback className="bg-ens-grad" />
        </Avatar>
        <div className="ml-2">
          <h3 className="">{nameText}</h3>
        </div>
      </a>
      <hr />
      <ScoreCard scores={scores} />
      <hr />
      <p className="text-xl font-bold">{govScore}/10 GovScore</p>
    </div>
  );
}

export function OPBalanceCard({ balance }: { balance: string | number }) {
  const roundedNum = Math.round(Number(balance) * 10) / 10;
  return (
    <div className="my-4 mx-auto bg-muted py-4 px-4 md:px-8 rounded w-11/12 md:w-[28rem] shadow-md">
      <span>
        You have <span className="font-bold">{roundedNum} OP</span>
      </span>
    </div>
  );
}

export function ScoreCard({ scores }: { scores: Scores }) {
  const ensScore = scores.ensName + scores.ensAvatar;
  return (
    <div className="text-sm">
      {/* Ens Score */}
      <div className="flex items-center gap-1 [&>*]:shrink-0 overflow-hidden">
        {ensScore === 2 ? (
          <CheckIcon />
        ) : ensScore === 1 ? (
          <MinusIcon />
        ) : (
          <XMarkIcon />
        )}
        <ScorePill score={`${ensScore}/2`} />
        <span>
          {ensScore === 2
            ? "ENS primary name and avatar set"
            : ensScore === 1
            ? "ENS primary name set, no avatar"
            : "No ENS primary name or avatar set"}
        </span>
      </div>

      {/* Recent Voting Score */}
      <div className="flex items-center gap-1 [&>*]:shrink-0 overflow-hidden">
        {scores.recentParticipation > 3.5 ? (
          <CheckIcon />
        ) : scores.recentParticipation > 1.5 ? (
          <MinusIcon />
        ) : (
          <XMarkIcon />
        )}
        <ScorePill score={`${scores.recentParticipation}/5`} />
        <span>
          Voted in{" "}
          <span className="special">{scores.recentParticipation * 2}</span> of
          last <span className="special">10</span> onchain proposals
        </span>
      </div>

      {/* Voting Power Score */}
      <div className="flex items-center gap-1 [&>*]:shrink-0 overflow-hidden">
        {scores.pctDelegation === 3 ? (
          <CheckIcon />
        ) : scores.pctDelegation > 0 ? (
          <MinusIcon />
        ) : (
          <XMarkIcon />
        )}
        <ScorePill score={`${scores.pctDelegation}/3`} />
        <span>
          {getPctDelegationText(scores.pctDelegation)} of total delegated OP
        </span>
      </div>
    </div>
  );
}

function getPctDelegationText(score: number) {
  switch (score) {
    case 0:
      return "More than 1.5%";
    case 1:
      return "More than 1.0%";
    case 2:
      return "More than 0.5%";
    case 3:
      return "Less than 0.5%";
  }
}

export function ScorePill({ score }: { score: string | number }) {
  return (
    <div className="rounded-full text-xs text-center w-9 h-[1.3em] bg-gray-600 text-white font-bold">
      {score}
    </div>
  );
}
