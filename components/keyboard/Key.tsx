import { type ReactNode, useEffect, useState } from 'react'

import type { KeyValue } from '../../lib/keyboard'
import type { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({ children, status, width = 40, value, onClick }: Props) => {
  const [classes, setClasses] = useState('')

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  useEffect(() => {
    if (!status) setClasses('bg-slate-600 hover:bg-slate-500 active:bg-slate-700 text-white')
    if (status === 'absent') setClasses('bg-slate-800 text-white opacity-50')
    if (status === 'correct')
      setClasses('bg-green-600 hover:bg-green-500 active:bg-green-700 text-white')
    if (status === 'present')
      setClasses('bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white')
  }, [status])

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={`flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none ${classes}`}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
