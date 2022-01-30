import { useEffect, useState } from 'react'

import { CharStatus } from '../../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const [classes, setClasses] = useState('')
  const [textValue, setTextValue] = useState('')
  const [cellAnimation, setCellAnimation] = useState('')

  useEffect(() => {
    if (!status) setClasses('bg-white border-slate-200 dark:bg-gray-600')
    if (status === 'absent') setClasses('bg-slate-400 dark:bg-gray-400 text-white border-slate-400')
    if (status === 'correct')
      setClasses('bg-green-500 dark:bg-green-700 text-white border-green-500')
    if (status === 'present')
      setClasses('bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500')
    if (value !== undefined) setCellAnimation('cellAnimation')
    setTextValue(value)
  }, [status, value])

  return (
    <div
      className={`w-12 sm:w-14 h-12 sm:h-14 border-solid border-2 dark:border-gray-400 flex items-center justify-center mx-0.5 text-lg font-bold rounded ${classes} ${cellAnimation}`}
    >
      {textValue}
    </div>
  )
}
