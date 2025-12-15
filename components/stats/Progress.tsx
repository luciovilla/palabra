type Props = {
  index: number
  size: number
  label: string
}

export const Progress = ({ index, size, label }: Props) => {
  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center w-2 text-slate-300">{index + 1}</div>
      <div className="w-full ml-2">
        <div
          style={{ width: `${6 + size}%` }}
          className="bg-green-500 text-xs font-medium text-slate-200 text-center p-0.5"
        >
          {label}
        </div>
      </div>
    </div>
  )
}
