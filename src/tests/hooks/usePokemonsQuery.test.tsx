import { describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { usePokemonsQuery } from '../../hooks/queries/usePokemonsQuery'

vi.mock('../../services/pokemon.service', () => ({
  getPokemons: vi.fn(async () => ({
    count: 2,
    nextOffset: null,
    prevOffset: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  })),
}))

describe('usePokemonsQuery', () => {
  it('fetches paginated pokemons', async () => {
    const client = new QueryClient()
    const { result } = renderHook(() => usePokemonsQuery(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.data?.pages[0].results.length).toBe(2)
  })
})


