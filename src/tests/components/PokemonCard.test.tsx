import { describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { PokemonCard } from '../../pages/Home/components/PokemonCard'

vi.mock('../../services/pokemon.service', () => ({
  getPokemonByName: vi.fn(async () => ({
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [{ slot: 1, type: { name: 'electric' } }],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
    ],
    sprites: {
      front_default: 'front.png',
      front_shiny: 'shiny.png',
      other: { 'official-artwork': { front_default: 'art.png' } },
    },
  })),
}))

function wrapper(children: React.ReactNode) {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('PokemonCard', () => {
  it('renders name and image', async () => {
    render(wrapper(<PokemonCard name="pikachu" />))

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument()
    const img = await screen.findByRole('img', { name: /imagen de pikachu/i })
    expect(img).toBeInTheDocument()
  })
})


