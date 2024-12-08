<script setup lang="ts">

import type { Pokemon } from 'pokenode-ts';
import PokemonCard from './PokemonCard.vue';

defineProps<{
    evolutionChain: Pokemon[]
}>()

</script>

<template>
    <div>
        <div v-for="pokemon in evolutionChain" :key="pokemon.id">
            <PokemonCard :pokemonCard="pokemon" />
        </div>
    </div>
</template>