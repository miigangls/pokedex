import { useQuery } from '@tanstack/react-query'
import { adaptEvolutionChain, adaptPokemon, adaptSpeciesDescription } from '../../adapters/pokemon.adapter'
import { getEvolutionChainByUrl, getPokemonByName, getPokemonSpecies } from '../../services/pokemon.service'
import type { PokemonDetail } from '../../models/pokemon'

export function usePokemonDetailQuery(name: string) {
  return useQuery<PokemonDetail>({
    queryKey: ['pokemon-detail', name],
    enabled: Boolean(name),
    queryFn: async () => {
      const pokemonRaw = await getPokemonByName(name)
      const pokemon = adaptPokemon(pokemonRaw)
      const species = await getPokemonSpecies(pokemon.id)
      const { description, evolutionChainUrl } = adaptSpeciesDescription(species)
      const evoRaw = await getEvolutionChainByUrl(evolutionChainUrl)
      const evolutionChain = adaptEvolutionChain(evoRaw)
      return { ...pokemon, description, evolutionChain }
    },
    staleTime: 1000 * 60 * 10,
  })
}


