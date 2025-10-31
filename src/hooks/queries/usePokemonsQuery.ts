import { useInfiniteQuery } from '@tanstack/react-query'
import { getPokemons } from '../../services/pokemon.service'
import type { PokemonsPage } from '../../models/pokemon'

const PAGE_SIZE = 24

export function usePokemonsQuery() {
  return useInfiniteQuery<PokemonsPage>({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => {
      const offset = typeof pageParam === 'number' ? pageParam : 0
      return getPokemons({ limit: PAGE_SIZE, offset })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    select: (data) => data, // already adapted in service
  })
}


