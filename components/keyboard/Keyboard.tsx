import { useEffect, useState } from 'react'
import type { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isGameWon: boolean
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, isGameWon }: Props) => {
  const [isDeadKey, setIsDeadKey] = useState(false)
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (!isGameWon) {
      if (value === 'ENTER') {
        onEnter()
      } else if (value === 'DELETE') {
        onDelete()
      } else {
        onChar(value)
      }
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!isGameWon) {
        if (e.key === 'Dead') {
          setIsDeadKey(true)
          return
        }

        if (e.code === 'Enter') {
          setIsDeadKey(false)
          onEnter()
        } else if (e.code === 'Backspace') {
          setIsDeadKey(false)
          onDelete()
        } else {
          const key = e.key.toUpperCase()
          if (isDeadKey && key === 'N') {
            setIsDeadKey(false)
            onChar('Ñ')
            return
          }

          if (key.length === 1 && ((key >= 'A' && key <= 'Z') || key === 'Ñ')) {
            setIsDeadKey(false)
            onChar(key)
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, isGameWon, isDeadKey])

  return (
    <div>
      <div className="flex justify-center mb-1 h-6">
        {isDeadKey && <span className="text-2xl font-bold text-slate-200 animate-pulse">˜</span>}
      </div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses.Q} />
        <Key value="W" onClick={onClick} status={charStatuses.W} />
        <Key value="E" onClick={onClick} status={charStatuses.E} />
        <Key value="R" onClick={onClick} status={charStatuses.R} />
        <Key value="T" onClick={onClick} status={charStatuses.T} />
        <Key value="Y" onClick={onClick} status={charStatuses.Y} />
        <Key value="U" onClick={onClick} status={charStatuses.U} />
        <Key value="I" onClick={onClick} status={charStatuses.I} />
        <Key value="O" onClick={onClick} status={charStatuses.O} />
        <Key value="P" onClick={onClick} status={charStatuses.P} />
        <Key width={50} value="DELETE" onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
          </svg>
        </Key>
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses.A} />
        <Key value="S" onClick={onClick} status={charStatuses.S} />
        <Key value="D" onClick={onClick} status={charStatuses.D} />
        <Key value="F" onClick={onClick} status={charStatuses.F} />
        <Key value="G" onClick={onClick} status={charStatuses.G} />
        <Key value="H" onClick={onClick} status={charStatuses.H} />
        <Key value="J" onClick={onClick} status={charStatuses.J} />
        <Key value="K" onClick={onClick} status={charStatuses.K} />
        <Key value="L" onClick={onClick} status={charStatuses.L} />
        <Key value="Ñ" onClick={onClick} status={charStatuses.Ñ} />
      </div>
      <div className="flex justify-center">
        <Key value="Z" onClick={onClick} status={charStatuses.Z} />
        <Key value="X" onClick={onClick} status={charStatuses.X} />
        <Key value="C" onClick={onClick} status={charStatuses.C} />
        <Key value="V" onClick={onClick} status={charStatuses.V} />
        <Key value="B" onClick={onClick} status={charStatuses.B} />
        <Key value="N" onClick={onClick} status={charStatuses.N} />
        <Key value="M" onClick={onClick} status={charStatuses.M} />
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
      </div>
    </div>
  )
}
