import { Cell } from './Cell'

type Props = {
  guess: string
  className?: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(6 - splitGuess.length))

  return (
    <div className={`flex justify-around mb-1 ${className}`}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
