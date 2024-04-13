import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";
import { ScoreCard, ScorePill } from "../delegates/card-components";

export default function Home() {
  return (
    <main className="mb-12">
      {faqItems.map(([question, response], i) => (
        <FaqAccordion
          question={question}
          response={response}
          key={i}
          index={i}
        />
      ))}
    </main>
  );
}

function FaqAccordion({
  question,
  response,
  index,
}: {
  question: string;
  response: ReactNode;
  index: number;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-11/12 md:w-readWidth"
    >
      <AccordionItem value={`item-${index + 1}`}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent>{response}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const faqItems: Array<[question: string, response: ReactNode]> = [
  [
    "How is the score calculated?",
    <>
      <p className="mb-2">
        GovScore ranks OP delegates on 3 key metrics:{" "}
        <span className="underline font-bold">transparency</span>,{" "}
        <span className="underline font-bold">consistency</span>, and{" "}
        <span className="underline font-bold">voting power</span>.
      </p>
      <p className="mb-2">
        The ideal candidate has a transparent onchain identity as identified
        using ENS, a consistent and proven recent voting history, and relatively
        low voting power.
      </p>
      <div className="mt-2 bg-secondary space-y-2 w-fit h-fit p-2 rounded-md shadow-lg">
        <div className="flex gap-1 items-center [&>div]:shrink-0">
          <ScorePill score={"2 pts"} />
          <p>1 point each for setting a primary ENS name and avatar</p>
        </div>
        <hr />
        <div className="flex gap-1 items-center [&>div]:shrink-0">
          <ScorePill score={"5 pts"} />
          <p>
            0.5 points for each vote casted on the 10 most recent onchain OP
            proposals
          </p>
        </div>
        <hr />
        <div className="flex gap-1 items-center [&>div]:shrink-0">
          <ScorePill score={"3 pts"} />
          <p>
            3 points for having less than 0.5% of the total voting pool
            <br />
            2 points for having less than 1%
            <br />1 point for having less than 1.5%
          </p>
        </div>
      </div>
      {/* <p className="mt-2">Ex...</p>
      <div className="bg-secondary w-fit h-fit px-2 py-1 rounded-md mb-2 shadow-lg">
        <ScoreCard
          scores={{
            ensName: 1,
            ensAvatar: 0,
            recentParticipation: 4.5,
            pctDelegation: 3,
          }}
        />
      </div> */}
    </>,
  ],
  [
    "Why GovScore?",
    "In the world of DAO governance and leadership, we see two core concerns among those in the space: first, the slow but consistent consolidation of power, and second, the concern of waning engagement among delegates. We believe strongly in the potential of decentralized governance, but to unlock that potential, we need to start with systems that hold delegates accountable. Enter GovScore: what we see as the first step in ensuring that those who decide the future of	DAOs are consistently the best for the job.",
  ],
  [
    "How do I set my ENS domain and avatar?",
    <>
      Visit{" "}
      <a
        href="https://app.ens.domains/"
        target="_blank"
        className="special link"
      >
        app.ens.domains
      </a>{" "}
      to register and set your primary ens name and avatar.
    </>,
  ],
];
