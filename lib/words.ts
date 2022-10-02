import { VALIDGUESSES } from '../constants/validGuesses'
import { WORDS } from '../constants/wordlist'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.some((e) => e.word === word.toLocaleLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  const epochMs = new Date('October 2, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index]?.word.toUpperCase() || '',
    solutionIndex: index + 1,
    tomorrow: nextday
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
