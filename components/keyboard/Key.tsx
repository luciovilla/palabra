import { ReactNode, useEffect, useState } from 'react'

import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

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
    if (!status) setClasses('bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-gray-400')
    if (status === 'absent') setClasses('bg-slate-400 dark:bg-gray-600 text-white')
    if (status === 'correct')
      setClasses('bg-green-500 dark:bg-green-700 hover:bg-green-600 active:bg-green-700 text-white')
    if (status === 'present')
      setClasses(
        'bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 active:bg-yellow-700 text-white'
      )
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
