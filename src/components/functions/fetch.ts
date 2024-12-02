import { store } from "@/store";
import { AxiosError } from "axios";
import type { Pokemon, PokemonSpecies, Type } from "pokenode-ts";

export async function getPokemonList() {
    try {
        store.pokemonList = await store.pokemonEndpoints.listPokemons(0, 12);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemonDesc(name: string): Promise<PokemonSpecies> {
    try {
        const response = await store.pokemonEndpoints.getPokemonSpeciesByName(name);
        if (!response) throw new Error("Pokemon data is missing");
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemon(name: string): Promise<Pokemon> {
    try {
        const response = await store.pokemonEndpoints.getPokemonByName(name);
        if (!response) throw new Error("Pokemon data is missing");
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}

export async function getPokemonTypes(name: string): Promise<Type[]> {
    try {
        const pokemon = await store.pokemonEndpoints.getPokemonByName(name);

        const types = pokemon.types.map((type) => {
            return store.pokemonEndpoints.getTypeByName(type.type.name);
        })
        const responses = await Promise.all(types);

        if (!responses) throw new Error("Pokemon data is missing");

        return responses;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}