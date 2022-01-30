import { useState, useEffect } from 'react'

import { Alert } from '../components/alerts/Alert'
import { Grid } from '../components/grid/Grid'
import { Keyboard } from '../components/keyboard/Keyboard'
import Meta from '../components/Meta'
import { AboutModal } from '../components/modals/AboutModal'
import { InfoModal } from '../components/modals/InfoModal'
import { StatsModal } from '../components/modals/StatsModal'
import ToggleDarkMode from '../components/ToggleDarkMode'
import { WIN_MESSAGES } from '../constants/strings'
import { WORDS } from '../constants/wordlist'
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from '../lib/localStorage'
import { addStatsForCompletedGame, loadStats } from '../lib/stats'
import { isWordInWordList, isWinningWord, solution } from '../lib/words'

const wordInfo = WORDS.find((w) => {
  return w.word === solution.toLocaleLowerCase()
})

const ALERT_TIME_MS = 2000

const Index = () => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [successAlert, setSuccessAlert] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })
  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)])
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (currentGuess.length < 6 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 6)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 6 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <>
      <Meta />
      <div className="py-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col h-screen justify-between">
        <div className="flex flex-col max-w-md mx-auto items-center sm:mb-1">
          <div className="flex items-center w-full mb-1">
            <h1 className="text-3xl sm:text-4xl grow font-bold">La Palabra</h1>
            <button
              className="p-2 flex items-center justify-center rounded mx-0.5 text-xs font-medium cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              onClick={() => setIsInfoModalOpen(true)}
            >
              How to play
            </button>
            <button
              className="p-2 flex items-center justify-center rounded mx-0.5 text-xs font-medium cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              onClick={() => setIsStatsModalOpen(true)}
            >
              Stats
            </button>
            <ToggleDarkMode />
          </div>
          <div className="max-w-sm mb-2 sm:mb-8">
            <h2 className="sm:text-lg">
              Today&apos;s word appears in Bad Bunny&apos;s song{' '}
              <span className="italic font-medium">{wordInfo.song}</span> (
              <a
                href={wordInfo.spotifyUrl}
                className="underline hover:text-gray-600 text-gray-800 dark:text-gray-200"
                target="_blank"
                rel="noreferrer"
              >
                hear it on Spotify
              </a>
              ).
            </h2>
          </div>
        </div>
        <Grid guesses={guesses} currentGuess={currentGuess} />
        <div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            isGameWon={isGameWon}
          />
          <div
            className="mx-auto w-[118px] mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-black dark:text-gray-200 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-700 select-none shadow-none "
            onClick={() => setIsAboutModalOpen(true)}
          >
            About this game
          </div>
        </div>

        <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          gameStats={stats}
          guesses={guesses}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShare={() => {
            setSuccessAlert('Game copied to clipboard')
            return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
          }}
        />
        <AboutModal isOpen={isAboutModalOpen} handleClose={() => setIsAboutModalOpen(false)} />
        <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
        <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
        <Alert message={`The word was ${solution}.`} isOpen={isGameLost} />
        <Alert message={successAlert} isOpen={successAlert !== ''} variant="success" />
      </div>
    </>
  )
}

export default Index
