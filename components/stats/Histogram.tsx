import { Progress } from './Progress'
import { GameStats } from '../../lib/localStorage'

type Props = {
  gameStats: GameStats
}

export const Histogram = ({ gameStats }: Props) => {
  const { winDistribution } = gameStats
  const maxValue = Math.max(...winDistribution)

  return (
    <div className="columns-1 justify-left m-2 text-sm">
      {winDistribution.map((value, i) => (
        <Progress key={i} index={i} size={90 * (value / maxValue)} label={String(value)} />
      ))}
    </div>
  )
}
