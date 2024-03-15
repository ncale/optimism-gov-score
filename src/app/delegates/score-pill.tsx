

export default function ScorePill({ score }: { score: number}) {

	const color = score > 0 ? 'green-500' : 'gray-300'

	return (
		<div className={`rounded-full text-xs text-center w-6 h-4 mr-1 bg-gray-600 text-white font-bold`}>
			{score}
		</div>
	)
}