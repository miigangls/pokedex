import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { PokemonGrid } from './components/PokemonGrid'
import { usePokemonQuery } from '../../hooks/queries/usePokemonQuery'
import { PokemonCard } from './components/PokemonCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function HomePage() {
  const [query, setQuery] = useState('')
  const search = usePokemonQuery(query.toLowerCase())
  const showSearch = query.trim().length > 0

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="mb-2 text-2xl font-semibold">Pokédex</h1>
        <p className="text-sm text-gray-600">Busca por nombre o navega la lista</p>
      </div>
      <div className="mt-2">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {showSearch ? (
        <div className="mt-4">
          {search.isPending && <p className="text-sm text-gray-600">Buscando...</p>}
          {search.status === 'error' && (
            <EmptyState message="No se encontró ningún Pokémon con ese nombre" />
          )}
          {search.data && <PokemonCard name={search.data.name} />}
        </div>
      ) : (
        <div className="mt-4">
          <PokemonGrid />
        </div>
      )}
    </div>
  )
}


