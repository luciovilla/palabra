import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Grid } from '../components/grid/Grid'
import { Intro } from '../components/Intro'
import { Keyboard } from '../components/keyboard/Keyboard'
import Meta from '../components/Meta'
import { AboutModal } from '../components/modals/AboutModal'
import { InfoModal } from '../components/modals/InfoModal'
import { StatsModal } from '../components/modals/StatsModal'
import winConfetti from '../components/winConfetti'
import { WIN_MESSAGES } from '../constants/strings'
import { WORDS } from '../constants/wordlist'
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from '../lib/localStorage'
import { addStatsForCompletedGame, loadStats } from '../lib/stats'
import { isWinningWord, isWordInWordList, solution } from '../lib/words'

const wordInfo = WORDS.find((w) => {
  return w.word === solution.toLocaleLowerCase()
})

const ALERT_TIME_MS = 2000

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (!loaded?.guesses) {
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
    if (guesses.length > 0) {
      setHasStarted(true)
    }
  }, [guesses.length])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      toast.success(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)])
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      toast.info(`The word was ${solution}.`)
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
      return toast.warning('Not enough letters')
    }

    if (!isWordInWordList(currentGuess)) {
      return toast.error('Word not found')
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 6 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        winConfetti()
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  if (!hasStarted) {
    return <Intro onPlay={() => setHasStarted(true)} />
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white relative overflow-hidden">
      <Meta />

      <div className="pb-8 pt-4 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col h-full justify-between relative z-10 w-full">
        <div className="flex flex-col max-w-md mx-auto items-center sm:mb-1 w-full">
          <div className="flex items-center w-full mb-1 justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-200 drop-shadow-sm">
                La Palabra
              </h1>
              <div className="max-w-sm mb-2 sm:mb-8 w-full">
                {wordInfo?.song && (
                  <h2 className="text-slate-300 text-sm">
                    Today's word appears in{' '}
                    <a
                      href={wordInfo.spotifyUrl}
                      className=" hover:text-green-300 underline text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {wordInfo.song}
                    </a>
                  </h2>
                )}
              </div>
            </div>
            <div className="flex items-center self-start space-x-2">
              <button
                className="p-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer select-none bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                onClick={() => setIsInfoModalOpen(true)}
              >
                Help
              </button>
              <button
                className="p-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer select-none bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                onClick={() => setIsStatsModalOpen(true)}
              >
                Stats
              </button>
            </div>
          </div>
        </div>
        {wordInfo?.song ? (
          <>
            <Grid guesses={guesses} currentGuess={currentGuess} />
            <div className="w-full max-w-lg mx-auto">
              <Keyboard
                onChar={onChar}
                onDelete={onDelete}
                onEnter={onEnter}
                guesses={guesses}
                isGameWon={isGameWon}
              />
            </div>
          </>
        ) : (
          <h2 className="sm:text-xl text-center">Working on adding more words. Espérame please.</h2>
        )}
        <div
          className="mx-auto mt-8 flex items-center px-4 py-2 border border-slate-700 text-xs font-medium rounded-full text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer select-none backdrop-blur-sm"
          onClick={() => setIsAboutModalOpen(true)}
        >
          About this game
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
            if (!navigator.canShare) {
              toast.success('Game copied to clipboard')
            }
          }}
        />
        <AboutModal isOpen={isAboutModalOpen} handleClose={() => setIsAboutModalOpen(false)} />
      </div>
    </div>
  )
}

export default Index
