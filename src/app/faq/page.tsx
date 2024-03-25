import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";

export default function Home() {
  return (
		<main className="main info-page">
			{faqItems.map(([question, response], i) => <FaqAccordion question={question} response={response} key={i} />)}
		</main>
	);
};

function FaqAccordion({ question, response }: { question: string, response: ReactNode }) {
	return (
		<Accordion type="single" collapsible className="mx-auto w-11/12 md:w-readWidth">
			<AccordionItem value="item-1">
				<AccordionTrigger>{question}</AccordionTrigger>
				<AccordionContent>
					{response}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

const faqItems: Array<[question: string, response: ReactNode]> = [
	["Why GovScore?", "In the world of DAO governance and leadership, we see two core concerns among those in the space: first, the slow but consistent consolidation of power, and second, the concern of waning engagement among delegates. We believe strongly in the potential of decentralized governance, but to unlock that potential, we need to start with systems that hold delegates accountable. Enter GovScore: what we see as the first step in ensuring that those who decide the future of	DAOs are consistently the best for the job."],
	["How is the score calculated?", 
		<>GovScore is calculated on 3 key metrics: transparency, consistency, and voting power.
			<p className="special mt-2">Transparency (2 pts)</p>
			<p>Transparency is the foundation of any healthy ecosystem because it is the basis of accountability. Delegates using ENS identify themselves - they provide observers with valuable points of reference everywhere they are referenced.</p>
			<p className="special mt-2">Consistency (3 pts)</p>
			<p>When delegates are consistent voters, two things happen: proposals can field more opinions, giving the DAO a stronger understanding of its ideals and goals, and second, proposals will get passed. Delegated tokens should be used.</p>
			<p className="special mt-2">Voting Power (5 pts)</p>
			<p>By distributing responsibility, a DAO can receive a diversity of opinions and approaches. Delegating to engaged and relatively less powerful delegates builds a more decentralized voice of the people.</p>
		</>],
	["How do I set my ENS domain and avatar?", <>Visit <a href="https://app.ens.domains/" target="_blank" className="special link">app.ens.domains</a> to register and set your primary ens name and avatar.</>],
]