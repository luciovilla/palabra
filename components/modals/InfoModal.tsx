import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 mb-2">
        Guess the word in 6 tries. After each guess, the color of the tiles will change to show how
        close your guess was to the word.
      </p>

      <p className="text-sm text-gray-500">The word is pulled from Bad Bunny's lyrics.</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" status="correct" />
        <Cell value="E" />
        <Cell value="R" />
        <Cell value="R" />
        <Cell value="E" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500">
        The letter <b>P</b> is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="T" />
        <Cell value="I" />
        <Cell value="E" status="present" />
        <Cell value="M" />
        <Cell value="P" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500">
        The letter <b>E</b> is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell value="O" />
        <Cell value="N" />
        <Cell value="E" status="absent" />
        <Cell value="J" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500">
        The letter <b>E</b> is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
