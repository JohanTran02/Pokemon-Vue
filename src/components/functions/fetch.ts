import { store } from "@/store";
import { AxiosError } from "axios";
import type { EvolutionChain, Pokemon, PokemonSpecies, Type } from "pokenode-ts";
import { extractIdFromUrl } from "./func";

export async function getPokemonList() {
    try {
        const response = await store.pokemonEndpoints.listPokemons(0, 12);

        if (!response) throw new Error("Pokemon data is missing");

        const convertedList = response.results.map((result) => {
            return {
                id: extractIdFromUrl(result.url)
            }
        })

        return store.pokemonList = {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: convertedList
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemonDesc(id: number): Promise<PokemonSpecies> {
    try {
        const response = await store.pokemonEndpoints.getPokemonSpeciesById(id);
        if (!response) throw new Error("Pokemon data is missing");
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemon(id: number): Promise<Pokemon> {
    try {
        const response = await store.pokemonEndpoints.getPokemonById(id);
        if (!response) throw new Error("Pokemon data is missing");
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemonTypes(id: number): Promise<Type[]> {
    try {
        const pokemon = await store.pokemonEndpoints.getPokemonById(id);

        const types = pokemon.types.map((type) => {
            return store.pokemonEndpoints.getTypeByName(type.type.name);
        })
        const responses = await Promise.all(types);
        console.log(responses)

        if (!responses) throw new Error("Pokemon data is missing");

        return responses;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

//Fortsätt att designa evolution chain 
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
    try {
        const response = await store.evolutionEndpoints.getEvolutionChainById(id);
        if (!response) throw new Error("Pokemon data is missing");

        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}