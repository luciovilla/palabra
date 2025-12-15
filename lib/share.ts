import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

export const shareStatus = (guesses: string[], lost: boolean) => {
  const shareText = `La Palabra ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n${generateEmojiGrid(guesses)}`

  if (navigator.share) {
    navigator.share({
      text: shareText
    })
  } else {
    navigator.clipboard.writeText(shareText)
  }
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
