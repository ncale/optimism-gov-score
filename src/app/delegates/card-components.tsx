import {
  IconCheck,
  IconMinus,
  IconXMark,
} from "@/components/icons/lucide-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type DelegateTableRow } from "./columns";
import {
  type PowerFactorDetails,
  type ActivityFactorScores,
} from "@/lib/utils";

export function DelegateCard({ delegate }: { delegate: DelegateTableRow }) {
  const address = delegate.metadata__address;
  const ensName = delegate.metadata__ens_name;
  const ensAvatar = delegate.metadata__ens_avatar;
  const govScore = delegate.gov_score;

  const nameText = ensName
    ? ensName
    : `${address.slice(0, 5)}...${address.slice(-4)}`;

  return (
    <div className="items-left flex w-full flex-col gap-1.5">
      <div>Your delegate is...</div>
      <a
        href={`https://vote.optimism.io/delegates/${address}`}
        target="_blank"
        className="flex items-center text-lg font-bold md:text-2xl"
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
      <p className="text-xl font-bold">{govScore} GovScore</p>
    </div>
  );
}

export function OPBalanceCard({ balance }: { balance: string | number }) {
  const roundedNum = Math.round(Number(balance));
  return (
    <div className="w-full">
      <span>
        You have <span className="font-bold">{roundedNum} OP</span>
      </span>
    </div>
  );
}

export function ActivityScoreCard({
  scores,
}: {
  scores: ActivityFactorScores;
}) {
  const ensScore = scores.ensName + scores.ensAvatar;
  return (
    <div className="text-sm">
      {/* Recent Voting Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {scores.recentParticipation > 420 ? (
          <IconCheck />
        ) : scores.recentParticipation > 180 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${scores.recentParticipation}/600`} />
        <span>
          Voted in{" "}
          <span className="special">{scores.recentParticipation / 60}</span> of
          last <span className="special">10</span> onchain props
        </span>
      </div>

      {/* Ens Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {ensScore === 200 ? (
          <IconCheck />
        ) : ensScore === 100 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${ensScore}/200`} />
        <span>
          {ensScore === 200
            ? "ENS primary name and avatar set"
            : ensScore === 100
              ? "ENS primary name set, no avatar"
              : "No ENS primary name or avatar set"}
        </span>
      </div>

      {/* Recent Voting With Reason Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {scores.recentParticipationWithReason > 140 ? (
          <IconCheck />
        ) : scores.recentParticipationWithReason > 60 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${scores.recentParticipationWithReason}/200`} />
        <span>
          Voted with reason in{" "}
          <span className="special">
            {scores.recentParticipationWithReason / 20}
          </span>{" "}
          of last <span className="special">10</span> props
        </span>
      </div>
    </div>
  );
}

export function PowerFactorScoreCard({
  powerFactor,
  powerFactorDetails,
}: {
  powerFactor: number;
  powerFactorDetails: PowerFactorDetails;
}) {
  const pctVotingPower = powerFactorDetails.pctVotingPower;
  const roundedPctVotingPower = Math.round(pctVotingPower * 1000) / 1000;
  return (
    <div className="w-48 space-y-1 text-sm">
      {/* Summary & Formula */}
      <div className="flex items-center space-x-1">
        {powerFactor > 700 ? (
          <IconCheck />
        ) : powerFactor > 300 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={powerFactor} />
        <pre className="pl-0.5 text-xs">
          {"= 1000*(e^"}
          <span className="text-blue-600 underline">
            -{roundedPctVotingPower}
          </span>
          {")"}
        </pre>
      </div>

      {/* Divider */}
      <hr />

      {/* Description */}
      <div className="leading-tight">
        Function related to a delegate's voting power %. For more info, see the
        FAQ.
      </div>
    </div>
  );
}

export function ScorePill({ score }: { score: string | number }) {
  return (
    <div className="h-[1.3em] w-fit rounded-full bg-gray-600 px-1 text-center text-xs font-bold text-white">
      {score}
    </div>
  );
}
