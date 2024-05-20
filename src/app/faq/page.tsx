import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";
import { ScorePill } from "../delegates/card-components";

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
    "What is GovScore?",
    <div className="space-y-2">
      <p>
        <span className="mb-1 block font-medium underline">Short answer:</span>{" "}
        GovScore is a platform for ranking and discovering Optimism DAO
        delegates.
      </p>
      <p>
        <span className="mb-1 block font-medium underline">Long answer:</span>{" "}
        In the world of DAO governance and leadership, we see two core concerns
        among those in the space. First, the slow but consistent consolidation
        of power, and second, the concern of waning engagement among delegates.
        We believe strongly in the potential of decentralized governance, but to
        protect that potential, we need to start with systems that prevent
        consolidation and hold delegates accountable.
      </p>
      <p>
        This is where we see GovScore enter the equation. In the constantly
        changing space of DAO governance, this is a step in the direction of
        trying to ensure those who decide the future of DAOs are consistently
        the best for the job.
      </p>
    </div>,
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
