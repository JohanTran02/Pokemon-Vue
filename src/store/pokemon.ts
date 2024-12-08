import pinia from "./initateStore";
import { convertEvolutions, extractIdFromUrl } from "@/components/functions/func";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { PokemonClient, type Pokemon, EvolutionClient } from "pokenode-ts";
import { ref } from "vue";

const usePokemonStore = defineStore("pokemon", () => {
    const pokemonEndpoints = ref<PokemonClient>(new PokemonClient());
    const pokemons = ref<Pokemon[]>([]);
    const evolutionEndpoints = ref<EvolutionClient>(new EvolutionClient());
    const pokemonCards = ref<Pokemon[]>([]);
    const pokemonOffset = ref<number>(0);

    function incrementOffset() {
        pokemonOffset.value += 12
    }

    async function getPokemonList() {
        try {
            const response = await pokemonEndpoints.value.listPokemons(pokemonOffset.value, 12);

            if (!response) throw new Error("Pokemon data is missing");

            const convertedList = response.results.map((result) => {
                return getPokemon(extractIdFromUrl(result.url));
            })

            pokemonCards.value = await Promise.all(convertedList);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            throw error;
        }
    }

    // async function getAllPokemons() {
    //     try {
    //         const response = await pokemonEndpoints.value.listPokemons(0, 2000);

    //         if (!response) throw new Error("Pokemon data is missing");

    //         const convertedPokemons = response.results.map((result) => {
    //             return getPokemonByName(result.name)
    //         })

    //         pokemons.value = await Promise.all(convertedPokemons);
    //     } catch (error) {
    //         if (error instanceof AxiosError) {
    //             console.log(error.response);
    //         }
    //         throw error;
    //     }
    // }

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
            const pokemonDesc = await getPokemonDesc(id);
            const response = await evolutionEndpoints.value.getEvolutionChainById(extractIdFromUrl(pokemonDesc.evolution_chain.url));

            const evolutionChain = convertEvolutions(response.chain);

            const pokemonEvolutions = evolutionChain.map((pokemon) => {
                return getPokemon(pokemon.id)
            })

            return Promise.all(pokemonEvolutions);
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
        pokemonCards,
        pokemonOffset,
        // getAllPokemons,
        getEvolutionChain,
        getPokemon,
        getPokemonByName,
        getPokemonDesc,
        getPokemonList,
        getPokemonTypes,
        incrementOffset,
    }
})

const store = usePokemonStore(pinia);

export default store;