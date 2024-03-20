import Image from "next/image";

export default function Home() {
  return (
		<main className="main thesis-page">
			<h2>Thesis</h2>
			<p>
				In the world of DAO governance and leadership, three key pillars stand out as 
				essential components for ensuring long-lasting and successful outcomes: <span>transparency</span>, 
				<span> consistency</span>, and <span>balance of power</span>.
			</p>
			<Image src='/infographic.png' alt='GovScore infographic' width={1995} height={1258} className="infographic"/>
		</main>
	);
};