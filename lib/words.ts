import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

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
  // 1643173200 == January 25, 2022 12:00 AM Game Epoch timestamp in milliseconds
  // Get Epoch time from: https://www.epochconverter.com
  const epochMs = 1643086800000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)

  return {
    solution: WORDS[index]['word'].toUpperCase(),
    solutionIndex: index + 1
  }
}

export const { solution, solutionIndex } = getWordOfDay()
