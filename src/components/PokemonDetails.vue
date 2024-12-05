<script setup lang="ts">
import { AxiosError } from 'axios';
import { type EvolutionChain, type Pokemon, type PokemonSpecies, type Type } from 'pokenode-ts';
import { computed, ref, watchEffect } from 'vue';
import PokemonType from './PokemonType.vue';
import { getEvolutionChain, getPokemon, getPokemonDesc, getPokemonTypes } from './functions/fetch';
import { calculateWeaknesses, convertEvolutions, convertTypes } from './functions/func';
import PokemonItem from './PokemonItem.vue';

const props = defineProps<{
    id: string
}>();

const pokemon = ref<Pokemon>({} as Pokemon);
const pokemonDesc = ref<PokemonSpecies>({} as PokemonSpecies);
const pokemonType = ref<Type[]>([]);
const pokemonEvolution = ref<EvolutionChain>({} as EvolutionChain)
const loading = ref<boolean>(false);

const pokemonImg = computed(() => {
    let pokemonImage: string = "";
    if (pokemon.value.sprites) {
        pokemonImage = pokemon.value.sprites.other?.['official-artwork'].front_default as string ?? pokemon.value.sprites.front_default as string;
    }
    return pokemonImage;
});

const pokemonStats = computed(() => {
    const stats: PokemonStats[] = pokemon.value.stats.map((stat) => {
        return {
            base_stat: stat.base_stat,
            effort: stat.effort,
            name: stat.stat.name
        }
    })
    return stats;
});

const pokemonAbiliites = computed(() => {
    const abilities: PokemonAbilities[] = pokemon.value.abilities.map((ability) => {
        return {
            is_hidden: ability.is_hidden,
            slot: ability.slot,
            ability: {
                name: ability.ability.name,
            }
        }
    })
    return abilities;
})

const pokemonTypeRelations = computed(() => {
    const types = pokemonType.value.map((type) => type.name);

    const pokemonTypes = convertTypes(pokemonType.value);

    const pokemonTypeRelations = calculateWeaknesses(types, pokemonTypes)

    return pokemonTypeRelations;
})

const pokemonEvolutions = computed(() => {
    const test = convertEvolutions(pokemonEvolution.value.chain);
    console.log(test);
    return test
})

watchEffect(async () => {
    await PokemonData();
})

async function PokemonData() {
    loading.value = true
    try {
        const [pokemonValue, pokemonDescValue, pokemonTypesValue, pokemonEvolutionValue]: [Pokemon, PokemonSpecies, Type[], EvolutionChain] = await Promise.all([getPokemon(Number(props.id)), getPokemonDesc(Number(props.id)), getPokemonTypes(Number(props.id)), getEvolutionChain((Number(props.id)))]);
        pokemon.value = pokemonValue;
        pokemonDesc.value = pokemonDescValue;
        pokemonType.value = pokemonTypesValue;
        pokemonEvolution.value = pokemonEvolutionValue;
        loading.value = false;
    }
    catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        }
        throw error;
    }
}
</script>

<template>
    <div v-if="!loading" class="mx-auto pokemonDetails p-4">
        <div class="pokemonContainer">
            <div class="text-xl">
                <img :src="pokemonImg" :alt="pokemon.name" class="mx-auto object-cover bg-slate-400">
                <div class="flex pb-4 gap-2 text-2xl">
                    <h1 class="capitalize font-bold">{{ pokemon.name }}</h1>
                    <p class="text-gray-400 text-opacity-80 font-semibold">#{{ pokemon.id }}</p>
                </div>
                <div class="space-y-4 bg-blue-300">
                    <p>{{ pokemonDesc.flavor_text_entries[3].flavor_text }}</p>
                    <div class="capitalize flex justify-center space-x-4">
                        <div>
                            <h1>height</h1>
                            <p class="lowercase">{{ pokemon.height / 10 }} m</p>
                        </div>
                        <div>
                            <h1>weight</h1>
                            <p class="lowercase">{{ pokemon.weight / 10 }} kg</p>
                        </div>
                        <div>
                            <h1>abilities</h1>
                            <template v-for="abilities in pokemonAbiliites" :key="abilities">
                                <p v-if="!abilities.is_hidden">{{ abilities.ability.name }}</p>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-col gap-2 capitalize">
                    <PokemonType :title="'type'" :pokemon-types="pokemon.types" />
                    <PokemonType :title="'weaknesses'" :pokemon-weaknesses="pokemonTypeRelations" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">Stats</h1>
                    <p v-for="stats in pokemonStats" :key="stats.name" class="text-xl">{{ stats.name }}:{{
                        stats.base_stat }}</p>
                </div>
            </div>
            <div v-for="pokemons in pokemonEvolutions" :key="pokemons.id">
                <PokemonItem :pokemonId="pokemons.id" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.pokemonDetails {
    max-width: 970px;
}

.pokemonContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 10px;
}
</style>