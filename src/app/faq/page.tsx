import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export default function Home() {
  return (
    <main className="mb-12">
      {faqItems.map((item, i) => (
        <FaqAccordion
          question={item.question}
          response={item.response}
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
      // key={index}
      className="mx-auto w-11/12 md:w-readWidth"
    >
      <AccordionItem value={`item-${index + 1}`}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent>{response}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const faqItems: Array<{ question: string; response: ReactNode }> = [
  {
    question: "What is GovScore?",
    response: (
      <div className="space-y-2">
        <p>
          <span className="font-medium underline">Short answer:</span> GovScore
          is a platform for ranking and discovering Optimism DAO delegates.
        </p>
      </div>
    ),
  },
  {
    question: "Why is this important?",
    response: (
      <div className="space-y-2">
        <p>
          In the world of DAO governance and leadership, we see two core
          concerns among those in the space. First, the slow but consistent
          consolidation of power, and second, the concern of waning engagement
          and general apathy among token holders and delegates. We believe
          strongly in the potential of decentralized governance, but to protect
          that potential and help it flourish, we need to start with systems
          that prevent consolidation and hold delegates accountable.
        </p>
        <p>
          This is where GovScore enters. In the constantly changing space of DAO
          governance, this is a step in the direction of ensuring those who
          decide the future of DAOs are consistently the best for the job.
        </p>
      </div>
    ),
  },
  {
    question: "How do I set my ENS domain and avatar?",
    response: (
      <div className="space-y-2">
        <p>
          Visit{" "}
          <a
            href="https://app.ens.domains/"
            target="_blank"
            className="special link"
          >
            app.ens.domains
          </a>{" "}
          to register and set your primary ens name and avatar.
        </p>
      </div>
    ),
  },
];
