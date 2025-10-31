import { useLocalStorage } from '../../hooks/useLocalStorage'
import { PokemonCard } from '../Home/components/PokemonCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function FavoritesPage() {
  const favorites = useLocalStorage<string[]>('favorites', [])
  const names = favorites.value

  return (
    <section className="py-6">
      <h1 className="mb-4 text-2xl font-semibold">Favoritos</h1>
      {names.length === 0 ? (
        <EmptyState message="Aún no tienes pokémon favoritos." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {names.map((name) => (
            <PokemonCard key={name} name={name} />
          ))}
        </div>
      )}
    </section>
  )
}


