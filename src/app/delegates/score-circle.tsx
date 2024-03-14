

export default function ScoreCircle({ num }: { num: number}) {

	const color = num > 0 ? 'green-500' : 'gray-300'

	return (
		<div className={`rounded-full text-xs text-center w-4 h-4 mr-1 bg-${color}`}>
			{num}
		</div>
	)
}