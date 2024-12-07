<script setup lang="ts">
import { AxiosError } from 'axios';
import type { Pokemon, PokemonSpecies, Type } from 'pokenode-ts';
import { computed, ref, watchEffect } from 'vue';
import { getPokemon, getPokemonDesc, getPokemonTypes } from './functions/fetch';
import { calculateWeaknesses, convertTypes, extractIdFromUrl } from './functions/func';
import PokemonType from './PokemonType.vue';
import PokemonEvolutions from './PokemonEvolutions.vue';

const props = defineProps<{
    id: string
}>();

const pokemon = ref<Pokemon>({} as Pokemon);
const pokemonDesc = ref<PokemonSpecies>({} as PokemonSpecies);
const pokemonType = ref<Type[]>([]);
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

watchEffect(async () => {
    await PokemonData();
})

async function PokemonData() {
    loading.value = true
    try {
        const [pokemonValue, pokemonDescValue, pokemonTypesValue]: [Pokemon, PokemonSpecies, Type[]] = await Promise.all([getPokemon(Number(props.id)), getPokemonDesc(Number(props.id)), getPokemonTypes(Number(props.id))]);
        pokemon.value = pokemonValue;
        pokemonDesc.value = pokemonDescValue;
        pokemonType.value = pokemonTypesValue;
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
            <div class="flex flex-col justify-around">
                <div class="flex flex-col gap-2 capitalize">
                    <PokemonType :title="'type'" :pokemon-types="pokemon.types" />
                    <PokemonType :title="'weaknesses'" :pokemon-weaknesses="pokemonTypeRelations" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">Stats</h1>
                    <p v-for="stats in pokemonStats" :key="stats.name" class="text-xl">{{ stats.name }}:{{
                        stats.base_stat }}</p>
                </div>
                <PokemonEvolutions v-if="pokemonDesc.evolution_chain.url"
                    :evolution-id="extractIdFromUrl(pokemonDesc.evolution_chain.url)" class="flex" />
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