export default function ScorePill({ score }: { score: number}) {
	return (
		<div className={`rounded-full text-xs text-center w-6 h-4 mr-1 bg-gray-600 text-white font-bold`}>
			{score}
		</div>
	)
}