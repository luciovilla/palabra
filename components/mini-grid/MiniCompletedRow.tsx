import { MiniCell } from './MiniCell'
import { getGuessStatuses } from '../../lib/statuses'

type Props = {
  guess: string
}

export const MiniCompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} />
      ))}
    </div>
  )
}
