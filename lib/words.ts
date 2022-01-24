import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase()) || VALIDGUESSES.includes(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // 1643000400000 == January 24, 2022 5:00 AM Game Epoch timestamp in milliseconds
  // Get Epoch time from: https://www.epochconverter.com
  const epochMs = 1643000400000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)

  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: 0 + 1
  }
}

export const { solution, solutionIndex } = getWordOfDay()
