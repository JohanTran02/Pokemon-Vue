import pinia from "./initateStore";
import { extractIdFromUrl } from "@/components/functions/func";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { PokemonClient, type Pokemon, EvolutionClient } from "pokenode-ts";
import { ref } from "vue";

const usePokemonStore = defineStore("pokemon", () => {
    const pokemonEndpoints = ref<PokemonClient>(new PokemonClient());
    const pokemons = ref<PokemonObject[]>([]);
    const evolutionEndpoints = ref<EvolutionClient>(new EvolutionClient());
    const pokemonList = ref<PokemonAPIList>({} as PokemonAPIList);
    const pokemonCards = ref<Pokemon[]>([]);

    async function getPokemonList() {
        try {
            const response = await pokemonEndpoints.value.listPokemons(0, 12);

            if (!response) throw new Error("Pokemon data is missing");

            const convertedList = response.results.map((result) => {
                return {
                    id: extractIdFromUrl(result.url)
                }
            })

            pokemonList.value = {
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

    async function getAllPokemons() {
        try {
            const response = await pokemonEndpoints.value.listPokemons(0, 2000);

            if (!response) throw new Error("Pokemon data is missing");

            const convertedPokemons = response.results.map((result) => {
                return {
                    name: result.name,
                    id: extractIdFromUrl(result.url)
                }
            })

            pokemons.value = convertedPokemons;

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            throw error;
        }
    }

    async function getPokemonDesc(id: number) {
        try {
            const response = await pokemonEndpoints.value.getPokemonSpeciesById(id);
            if (!response) throw new Error("Pokemon data is missing");
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            throw error;
        }
    }

    async function getPokemon(id: number) {
        try {
            const response = await pokemonEndpoints.value.getPokemonById(id);
            if (!response) throw new Error("Pokemon data is missing");
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            throw error;
        }
    }

    async function getPokemonByName(name: string) {
        try {
            const response = await pokemonEndpoints.value.getPokemonByName(name);
            if (!response) throw new Error("Pokemon data is missing");
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }

    async function getPokemonTypes(id: number) {
        try {
            const pokemon = await pokemonEndpoints.value.getPokemonById(id);

            const types = pokemon.types.map((type) => {
                return pokemonEndpoints.value.getTypeByName(type.type.name);
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

    async function getEvolutionChain(id: number) {
        try {
            const response = await evolutionEndpoints.value.getEvolutionChainById(id);
            if (!response) throw new Error("Pokemon data is missing");

            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            throw error;
        }
    }

    return {
        pokemonEndpoints,
        pokemons,
        evolutionEndpoints,
        pokemonList,
        pokemonCards,
        getAllPokemons,
        getEvolutionChain,
        getPokemon,
        getPokemonByName,
        getPokemonDesc,
        getPokemonList,
        getPokemonTypes
    }
})

const store = usePokemonStore(pinia);

export default store;