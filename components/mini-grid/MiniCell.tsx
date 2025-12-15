import classnames from 'classnames'

import type { CharStatus } from '../../lib/statuses'

type Props = {
  status: CharStatus
}

export const MiniCell = ({ status }: Props) => {
  const classes = classnames(
    'w-10 h-10 border-solid border-2 border-slate-200 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white': status === 'absent',
      'bg-green-500': status === 'correct',
      'bg-yellow-500': status === 'present'
    }
  )

  return <div className={classes}></div>
}
