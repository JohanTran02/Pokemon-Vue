<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { convertEvolutions } from './functions/func';
import type { EvolutionChain } from 'pokenode-ts';
import store from '@/store/pokemon';
import { AxiosError } from 'axios';
import PokemonCard from './PokemonCard.vue';

const props = defineProps<{
    evolutionId: number
}>();

const { getEvolutionChain } = store;

const loading = ref<boolean>(false);
const pokemonEvolution = ref<EvolutionChain>({} as EvolutionChain)

const pokemonEvolutions = computed(() => {
    const evolutionChain = convertEvolutions(pokemonEvolution.value.chain);
    return evolutionChain
})

watchEffect(async () => {
    await getPokemonData();
})

async function getPokemonData() {
    loading.value = true
    try {
        pokemonEvolution.value = await getEvolutionChain(props.evolutionId);
        console.log(pokemonEvolution.value)
        loading.value = false
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
    <div v-if="!loading && pokemonEvolution.chain.evolves_to.length > 0">
        <div v-for="pokemons in pokemonEvolutions" :key="pokemons.id">
            <PokemonCard :pokemonId="pokemons.id" />
        </div>
    </div>
</template>