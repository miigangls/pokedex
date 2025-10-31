export type PokemonStat = {
  name: string
  value: number
}

export type Pokemon = {
  id: number
  name: string
  types: string[]
  height: number
  weight: number
  abilities: string[]
  stats: PokemonStat[]
  sprites: {
    default: string | null
    shiny: string | null
    artwork: string | null
  }
}

export type PokemonListItem = { name: string; url: string }

export type PokemonsPage = {
  count: number
  nextOffset: number | null
  prevOffset: number | null
  results: PokemonListItem[]
}

export type PokemonDetail = Pokemon & {
  description?: string
  evolutionChain: Array<{
    id: number
    name: string
    sprite: string
    minLevel?: number | null
  }>
}


