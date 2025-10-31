import { http } from './http'
import { adaptPokemonsPage } from '../adapters/pokemon.adapter'
import type { PokemonsPage } from '../models/pokemon'

export async function getPokemons(params: { limit: number; offset: number }): Promise<PokemonsPage> {
  const { limit, offset } = params
  const { data } = await http.get('/pokemon', { params: { limit, offset } })
  return adaptPokemonsPage(data)
}

export async function getPokemonByName(name: string) {
  const { data } = await http.get(`/pokemon/${name}`)
  return data
}

export async function getPokemonSpecies(nameOrId: string | number) {
  const { data } = await http.get(`/pokemon-species/${nameOrId}`)
  return data
}

export async function getEvolutionChainByUrl(url: string) {
  const { data } = await http.get(url)
  return data
}


