import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

export default function Home() {
  return (
		<main className="main thesis-page">
			<Accordion type="single" collapsible className='mx-auto w-11/12 md:w-readWidth'>
				<AccordionItem value="item-1">
					<AccordionTrigger>Why GovScore?</AccordionTrigger>
					<AccordionContent>
					In the world of DAO governance and leadership, we see two core concerns among those in the space: first, the slow 
					but consistent consolidation of power, and second, the concern of waning engagement among delegates. We believe strongly 
					in the potential of decentralized governance, but to unlock that potential, we need to start with systems that hold 
					delegates accountable. Enter GovScore: what we see as the first step in ensuring that those who decide the future of
					DAOs are consistently the best for the job.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible className="mx-auto w-11/12 md:w-readWidth">
				<AccordionItem value="item-1">
					<AccordionTrigger>How did you pick the criteria?</AccordionTrigger>
					<AccordionContent>
					wip
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</main>
	);
};