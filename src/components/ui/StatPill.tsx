type Props = {
  label: string
  value: number
  colorClass: string
}

export function StatPill({ label, value, colorClass }: Props) {
  return (
    <div className="rounded-full bg-gray-50 px-3 py-2 text-center">
      <div
        className={`mx-auto mb-1 flex size-8 items-center justify-center rounded-full text-xs font-bold ${colorClass}`}
      >
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  )
}


