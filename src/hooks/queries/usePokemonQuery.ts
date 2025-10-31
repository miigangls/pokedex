import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPokemonByName } from '../../services/pokemon.service'
import { adaptPokemon } from '../../adapters/pokemon.adapter'
import type { Pokemon } from '../../models/pokemon'

export function usePokemonQuery(name: string) {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', name],
    queryFn: async () => adaptPokemon(await getPokemonByName(name)),
    enabled: Boolean(name),
    staleTime: 1000 * 60 * 10,
  })
}

export function usePrefetchPokemon() {
  const client = useQueryClient()
  return (name: string) =>
    client.prefetchQuery({
      queryKey: ['pokemon', name],
      queryFn: async () => adaptPokemon(await getPokemonByName(name)),
      staleTime: 1000 * 60 * 10,
    })
}


