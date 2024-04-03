"use client";

// Components
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@nextui-org/react";
import DelegateButton from "./delegate-button";
// Hooks
import { useEnsName, useEnsAvatar } from "wagmi";
// Helper functions
import { formatBigNumber, formatPercentValue, calcGovScore } from "@/lib/utils";
import { normalize } from "viem/ens";
// Types
import type { CellContext, Row } from "@tanstack/react-table";
// Icons
import {
  FilterIcon,
  HelpIcon,
  ShareIcon,
} from "@/components/icons/lucide-icons";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScoreCard } from "./card-components";

const columnHelper = createColumnHelper<DelegateTableRow>();

export const columns = [
  columnHelper.accessor("rank", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="head mr-1">Rank</div>
          <FilterIcon />
        </Button>
      );
    },
    cell: ({ row }) => <div className="cell">{row.getValue("rank")}</div>,
  }),
  columnHelper.accessor(
    (delegate) => `${delegate.address} - ${delegate.username}`,
    {
      id: "address",
      header: () => <div className="head col-delegate">Delegate</div>,
      cell: (props) => <DelegateCell props={props} />,
    }
  ),
  columnHelper.accessor("gov_score", {
    header: () => <GovScoreHeader />,
    cell: ({ row }) => <GovScoreCell row={row} />,
  }),
  columnHelper.accessor("voting_power", {
    header: () => <div className="head">Voting Power</div>,
    cell: ({ row }) => {
      const num = formatBigNumber(row.getValue("voting_power"));
      return <div className="cell w-28">{`${num} OP`}</div>;
    },
  }),
  columnHelper.accessor("pct_voting_power", {
    header: () => <div className="head">% of Voting Power</div>,
    cell: ({ row }) => {
      const num = formatPercentValue(row.getValue("pct_voting_power"));
      return <div className="cell w-28">{num}</div>;
    },
  }),
  columnHelper.accessor("count_participation", {
    header: () => <div className="head">Recent Participation</div>,
    cell: ({ row }) => {
      const isUser = new RegExp("0x").test(row.original.address.toLowerCase());
      const voteCount = row.getValue("count_participation");
      return isUser ? (
        <div className="cell">{`${voteCount}/10 votes`}</div>
      ) : (
        <div className="cell  w-24">n/a</div>
      );
    },
  }),
  columnHelper.accessor("is_current_delegate", {
    header: () => <></>,
    cell: ({ row }) =>
      row.getValue("is_current_delegate") ? (
        <div className="cell">current delegate</div>
      ) : (
        <div className="cell w-20">
          <DelegateButton newDelegateeAddr={row.original.address} />
        </div>
      ),
  }),
] as ColumnDef<DelegateTableRow>[];

export type DelegateTableRow = {
  rank: number;
  address: `0x${string}`;
  username: string;
  pfpLink?: string;
  voting_power: number;
  pct_voting_power: number;
  count_participation: number;
  gov_score?: number;
  is_current_delegate?: boolean;
};

function DelegateCell({
  props,
}: {
  props: CellContext<DelegateTableRow, string>;
}) {
  const { data: ensName } = useEnsName({
    address: props.getValue().split(" - ")[0] as `0x${string}`,
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize(ensName?.toString() ?? ""),
    chainId: 1,
  });
  const [addr, username] = props.getValue().split(" - ");
  const isUser = new RegExp("0x").test(addr.toLowerCase());
  const abbrevAddress = `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  return (
    <>
      {isUser ? (
        <a
          href={`https://vote.optimism.io/delegates/${props.row.original.address}`}
          target="_blank"
        >
          <div className="cell w-56 flex items-center hover:scale-105 origin-left ease-in-out duration-75">
            <Avatar>
              {ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
              <AvatarFallback className="bg-ens-grad" />
            </Avatar>
            <div className="flex flex-col ml-2 mr-1 items-start justify-center">
              <h3 className="">{ensName ? ensName : abbrevAddress}</h3>
            </div>
            <ShareIcon />
          </div>
        </a>
      ) : (
        <div className="cell col-delegate flex flex-col ml-2 items-start justify-center">
          <h3 className="">{addr}</h3>
        </div>
      )}
    </>
  );
}

function GovScoreHeader() {
  return (
    <div className="head flex justify-center items-center gap-1">
      <div>GovScore</div>
      {/* Desktop */}
      <Tooltip
        content={
          <div>
            <div className="info-tooltip">
              <span className="line mb-1">
                An opinionated score of delegate quality.{" "}
              </span>
              <span className="line mb-1">
                A high govscore means a delegate{" "}
                <span className="special">votes consistently</span>, has a{" "}
                <span className="special">transparent onchain identity</span>,
                and is not <span className="special">too powerful</span>.{" "}
              </span>
              <Link href="/faq" className="special link">
                read more
              </Link>
            </div>
          </div>
        }
      >
        <span className="cursor-pointer hidden md:flex">
          <HelpIcon />
        </span>
      </Tooltip>
      {/* Mobile */}
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger>
            <span className="flex md:hidden">
              <HelpIcon />
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="leading-tight w-64 rounded-md">
              <span className="block mb-1">
                An opinionated score of delegate quality.{" "}
              </span>
              <span className="block mb-1">
                A high govscore means a delegate{" "}
                <span className="special">votes consistently</span>, has a{" "}
                <span className="special">transparent onchain identity</span>,
                and is not <span className="special">too powerful</span>.{" "}
              </span>
              <Link href="/faq" className="special link">
                read more
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function GovScoreCell({ row }: { row: Row<DelegateTableRow> }) {
  const { data: ensName } = useEnsName({
    address: row.original.address,
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize(ensName?.toString() ?? ""),
    chainId: 1,
  });
  const voteCount = row.original.count_participation;
  const govScoreConfig = {
    isEnsNameSet: typeof ensName === "string" && ensName.length > 0,
    isEnsAvatarSet: typeof ensAvatar === "string" && ensAvatar.length > 0,
    isFcAcctAttached: false, // dummy data
    recentParticipation: voteCount,
    pctDelegation: row.original.pct_voting_power,
  };
  const { scores } = calcGovScore(govScoreConfig);
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0);
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
  const pctDelegationText = getPctDelegationText(scores.pctDelegation);
  return (
    <div className="cell">
      {new RegExp("0x").test(row.original.address) ? (
        <>
          {/* Desktop */}
          <Tooltip placement="right" content={<ScoreCard scores={scores} />}>
            <span className="cursor-pointer hidden md:flex w-fit mx-auto">{`${govScore}/10`}</span>
          </Tooltip>
          {/* Mobile */}
          <Popover>
            <PopoverTrigger className="md:hidden">{`${govScore}/10`}</PopoverTrigger>
            <PopoverContent>
              <ScoreCard scores={scores} />
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <span>n/a</span>
      )}
    </div>
  );
}
