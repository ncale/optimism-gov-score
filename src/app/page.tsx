export default function Home() {
  return (
		<main className="main">
			<h2>Thesis</h2>
			<p>
				In the world of DAO governance and leadership, three key pillars stand out as 
				essential components for ensuring long-lasting and successful outcomes: <span>transparency</span>, 
				<span> consistency</span>, and <span>balance of power</span>.
			</p>
			<ul>
				<li><p>
					<span>Transparency</span> is the foundation of any healthy ecosystem as it is the basis of accountability. No 
					organization can or should be fully trusted if granted proprietary and/or protected aspects in their operations.
					DAOs (and blockchain) aims to solve this issue with a completely transparent ledger available to any party connected
					to the internet... but this goes one step further. While you may be able to see that an address (e.g. 0x38a2...) has 
					a delegated 5M governance tokens, how likely are you to recognize that address later? This is the second part of the
					transparency problem: the human element. Delegates should have a minimum of a pseudonymous identity to allow outside
					parties to understand who is voting and how. For this reason, in our model, having an associated ens address and pfp ranks
					into a given delegate's governance score.
				</p></li>
				<li><p>
					<span>Consistency</span> is another vital aspect in delegation practices. Delegates have a responsibility to the protocol 
					to have an opinion on and vote on proposals (especially when they have a large amount of voting power). 
					When a delegate is consistent in their presence, feedback, and actions, not only can team members know what to expect and 
					work more effectively towards common goals, but proposals can field more opinions, and the DAO can build a stronger 
					mission. Inconsistent or absent delegates or marked down in our model of governance score.
				</p></li>
				<li><p>
					The last vital aspect accounted for in our delegate governance score is <span>power distribution</span>. While 
					centralized authority can be helpful for quick decision-making and maintaining order, reversing the trend can often
					prove challending, and being too centralized can often hinder creativity, innovation, and actual autonomy. By 
					distributing responsibility - just enough so quorum can still be consistently met - and empowering team members 
					to make decisions, DAOs can operate according to their vision to a greater extent.
				</p></li>
			</ul>
			<p>
				In our vision, these three elements are key to establishing strong delegation practices. By delegating according to these 
				principles, we can cultivate trust, collaboration, and high performance within our DAOs.
			</p>
		</main>
	);
}
