import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isShake?: boolean
}

export const Grid = ({ guesses, currentGuess, isShake }: Props) => {
  const empties = guesses.length < 6 ? Array.from(Array(5 - guesses.length)) : []

  return (
    <div className="items-center sm:pb-6">
      <div className="max-w-sm mx-auto">
        {guesses.map((guess, i) => (
          <CompletedRow key={i} guess={guess} />
        ))}
        {guesses.length < 6 && (
          <CurrentRow guess={currentGuess} className={isShake ? 'shake' : ''} />
        )}
        {empties.map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </div>
    </div>
  )
}
