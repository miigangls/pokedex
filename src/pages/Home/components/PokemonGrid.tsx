import { useEffect, useRef } from 'react'
import { usePokemonsQuery } from '../../../hooks/queries/usePokemonsQuery'
import { PokemonCard } from './PokemonCard'
import { Loader } from '../../../components/ui/Loader'
import { ErrorState } from '../../../components/ui/ErrorState'

export function PokemonGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error, isPending } =
    usePokemonsQuery()
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) fetchNextPage()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  if (isPending) return <Loader />
  if (status === 'error')
    return <ErrorState message={error instanceof Error ? error.message : 'Error desconocido'} />

  const names = data?.pages.flatMap((p) => p.results.map((r) => r.name)) ?? []

  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
        role="list"
      >
        {names.map((name) => (
          <PokemonCard key={name} name={name} />
        ))}
      </div>
      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {isFetchingNextPage ? <Loader label="Cargando más..." /> : null}
        </div>
      )}
    </div>
  )
}


