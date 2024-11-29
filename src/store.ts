import { PokemonClient, type NamedAPIResource, type Pokemon } from "pokenode-ts";
import { reactive } from "vue";

export interface PokemonAPIList {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

export const store = reactive({
    pokemonEndpoints: new PokemonClient(),
    pokemonList: {} as PokemonAPIList,
    pokemonCards: [] as Pokemon[]
})
