import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePokemonDetailQuery } from '../../hooks/queries/usePokemonDetailQuery'
import { Loader } from '../../components/ui/Loader'
import { ErrorState } from '../../components/ui/ErrorState'
import { capitalize } from '../../utils/formatters'
import { StatPill } from '../../components/ui/StatPill'
import { getStatMeta } from '../../utils/stats'
import { getTypeClasses } from '../../utils/typeColors'

export function PokemonDetailPage() {
  const { name = '' } = useParams<{ name: string }>()
  const { data, isPending, status, error } = usePokemonDetailQuery(name)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 20)
    return () => clearTimeout(t)
  }, [])

  function handleClose() {
    setOpen(false)
    setTimeout(() => navigate(-1), 300)
  }

  if (isPending) return <Loader />
  if (status === 'error')
    return <ErrorState message={error instanceof Error ? error.message : 'Error desconocido'} />
  if (!data) return null

  return (
    <section className="py-0 sm:py-6">
      <div
        className={`fixed inset-y-0 right-0 w-full sm:static sm:w-auto sm:mx-0 sm:rounded-none sm:bg-transparent transform transition-transform duration-300 ease-out bg-white sm:bg-transparent shadow-xl sm:shadow-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative mx-auto max-w-3xl px-4 sm:px-0 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="sr-only">Detalle</h2>
            <button
              onClick={handleClose}
              className="ml-auto rounded-xl bg-gradient-to-br from-red-500 to-rose-500 p-2 text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.716-4.714a.75.75 0 1 1 1.06 1.06L13.06 10.586l4.716 4.715a.75.75 0 0 1-1.06 1.06L12 11.646l-4.715 4.715a.75.75 0 1 1-1.06-1.06l4.714-4.716-4.714-4.714a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {data.sprites.artwork || data.sprites.default ? (
            <img
              src={data.sprites.artwork ?? data.sprites.default ?? ''}
              alt={`Imagen de ${data.name}`}
              className="mx-auto h-40 w-40 object-contain sm:absolute sm:top-[-44px] sm:left-1/2 sm:-translate-x-1/2 sm:h-56 sm:w-56"
            />
          ) : null}
        <div className="space-y-5 pt-2 sm:pt-16">
          <div>
            <p className="text-sm text-gray-500">N° {data.id}</p>
            <h1 className="text-3xl font-semibold">{capitalize(data.name)}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.types.map((t: string) => (
                <span key={t} className={`inline-flex rounded-md px-3 py-1 text-sm ${getTypeClasses(t)}`}>
                  {capitalize(t)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Altura</p>
              <div className="mt-1 rounded-full bg-gray-100 px-4 py-2 text-center font-medium">
                {(data.height / 10).toFixed(1)} m
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peso</p>
              <div className="mt-1 rounded-full bg-gray-100 px-4 py-2 text-center font-medium">
                {(data.weight / 10).toFixed(1)} kg
              </div>
            </div>
          </div>

          {data.description && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Pokedex Entry</h2>
              <p className="text-sm text-gray-700">{data.description}</p>
            </div>
          )}

          {data.abilities.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Habilidades</h2>
              <div className="flex flex-wrap gap-3">
                {data.abilities.map((ab: string) => (
                  <span
                    key={ab}
                    className="inline-flex rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-800"
                  >
                    {capitalize(ab)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-2 text-lg font-semibold text-center">Stats</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {data.stats.map((s: { name: string; value: number }) => {
                const meta = getStatMeta(s.name)
                return <StatPill key={s.name} label={meta.abbr} value={s.value} colorClass={meta.color} />
              })}
              <div className="rounded-full bg-gray-50 px-3 py-2 text-center">
                <div className={`mx-auto mb-1 flex size-8 items-center justify-center rounded-full text-xs font-bold bg-blue-500 text-white`}>
                  TOT
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {data.stats.reduce((acc: number, s: { value: number }) => acc + s.value, 0)}
                </div>
              </div>
            </div>
          </div>

          {data.evolutionChain.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Evolución</h2>
              <div className="flex items-center gap-6">
                {data.evolutionChain.map(
                  (
                    evo: { id: number; name: string; sprite: string; minLevel?: number | null },
                    idx: number,
                  ) => (
                  <div key={evo.id} className="flex flex-col items-center gap-2">
                    <Link to={`/pokemon/${evo.name}`} className="group text-center">
                      <img src={evo.sprite} alt={evo.name} className="h-14 w-14" />
                      <div className="text-xs text-gray-600 group-hover:text-red-600">
                        {capitalize(evo.name)}
                      </div>
                    </Link>
                    {idx < data.evolutionChain.length - 1 && (
                      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        {data.evolutionChain[idx + 1]?.minLevel ? `Lv. ${data.evolutionChain[idx + 1]?.minLevel}` : 'Lv. ?'}
                      </div>
                    )}
                  </div>
                ),
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  )
}


