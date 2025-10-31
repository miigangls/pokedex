import { describe, expect, it } from 'vitest'
import { adaptPokemon } from '../../adapters/pokemon.adapter'

describe('pokemon.adapter', () => {
  it('adapts a PokeAPI pokemon to domain model', () => {
    const raw = {
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
    }
    const adapted = adaptPokemon(raw as never)
    expect(adapted).toMatchObject({
      id: 25,
      name: 'pikachu',
      types: ['electric'],
      sprites: { default: 'front.png', shiny: 'shiny.png', artwork: 'art.png' },
    })
  })
})


