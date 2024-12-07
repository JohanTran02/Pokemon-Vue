import { EvolutionClient, PokemonClient, type Pokemon } from "pokenode-ts";
import { reactive } from "vue";

export const store = reactive({
    pokemonEndpoints: new PokemonClient(),
    pokemons: [] as PokemonObject[],
    evolutionEndpoints: new EvolutionClient(),
    pokemonList: {} as PokemonAPIList,
    pokemonCards: [] as Pokemon[]
})
