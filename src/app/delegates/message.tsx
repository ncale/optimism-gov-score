import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Message() {
  return (
    <div className="mx-auto w-[996px] rounded-md border px-4 py-2 leading-relaxed">
      <p>
        {
          "GovScore is a platform for discovering quality underrepresented Optimism delegates. The factors that determine GovScore are "
        }
        <Popover>
          <PopoverTrigger className="inline-block rounded-sm  bg-cyan-50 px-1 text-cyan-800 underline hover:text-cyan-500 active:text-cyan-800">
            voting history (with and without reason)
          </PopoverTrigger>
          <PopoverContent className="w-60 text-sm">
            Voting History: 0.4 points are assigned to each vote a delegate
            participates in within the past 10 votes and 0.1 points are assigned
            to each vote when the delegate votes with reason onchain
          </PopoverContent>
        </Popover>
        {", "}
        <Popover>
          <PopoverTrigger className="inline-block rounded-sm  bg-emerald-50 px-1 text-emerald-800 underline hover:text-emerald-500 active:text-emerald-800">
            voting power
          </PopoverTrigger>
          <PopoverContent className="w-60 text-sm">
            Voting Power: 3 points are given to each delegate under 0.5% of the
            voting power, 2 points to delegates with less than 1%, and 1 point
            given to those with less than 1.5%
          </PopoverContent>
        </Popover>
        {", and "}
        <Popover>
          <PopoverTrigger className="inline-block rounded-sm  bg-violet-50 px-1 text-violet-800 underline hover:text-violet-400 active:text-violet-800">
            decentralized identity
          </PopoverTrigger>
          <PopoverContent className="w-60 text-sm">
            Decentralized Identity: 1 point is given to delegates who use an ENS
            primary name and 1 additional point for having an ENS avatar
          </PopoverContent>
        </Popover>
        {"."}
      </p>
    </div>
  );
}

// Many people put a significant amount of time and effort into
//         their contributions to the OP community with hardly any recognition. We
//         want to be able to say thanks to these delegates and help them get their
//         voices heard.
