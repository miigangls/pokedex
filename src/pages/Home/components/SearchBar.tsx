import type { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  const isEmpty = value.trim().length === 0

  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search your Pokemon"
        aria-label="Buscar pokémon"
        className="w-full rounded-2xl bg-white px-5 py-3 pr-16 text-sm text-gray-700 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-200"
      />
      <button
        type="button"
        onClick={() => (isEmpty ? null : onChange(''))}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 p-2 text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        aria-label={isEmpty ? 'Buscar' : 'Limpiar búsqueda'}
      >
        {isEmpty ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.215 12.03l4.252 4.253a.75.75 0 1 0 1.06-1.06l-4.252-4.254A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.716-4.714a.75.75 0 1 1 1.06 1.06L13.06 10.586l4.716 4.715a.75.75 0 0 1-1.06 1.06L12 11.646l-4.715 4.715a.75.75 0 1 1-1.06-1.06l4.714-4.716-4.714-4.714a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  )
}


