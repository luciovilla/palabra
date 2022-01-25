import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  gameStats: GameStats
}

export const StatsModal = ({ isOpen, handleClose, gameStats }: Props) => {
  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <StatBar gameStats={gameStats} />
      <h4 className="font-bold leading-6 text-gray-900">Guess Distribution</h4>
      <Histogram gameStats={gameStats} />
    </BaseModal>
  )
}
