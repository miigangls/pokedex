import { useEffect, useRef } from 'react'
import { useLegendaryPokemonsQuery } from '../../hooks/queries/useLegendaryPokemonsQuery'
import { Loader } from '../../components/ui/Loader'
import { ErrorState } from '../../components/ui/ErrorState'
import { PokemonCard } from '../Home/components/PokemonCard'

export function LegendaryPage() {
  const { data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useLegendaryPokemonsQuery()
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage) return
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) fetchNextPage()
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [fetchNextPage, hasNextPage])

  if (isPending) return <Loader />
  if (status === 'error')
    return <ErrorState message={error instanceof Error ? error.message : 'Error cargando'} />

  const names = data?.pages.flatMap((p) => p.names) ?? []

  return (
    <section className="space-y-6 py-6">
      <h1 className="text-2xl font-semibold">Legendary Pokémon</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {names.map((n) => (
          <PokemonCard key={n} name={n} />
        ))}
      </div>
      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {isFetchingNextPage ? <Loader label="Cargando más..." /> : null}
        </div>
      )}
    </section>
  )
}


