<!-- <script setup lang="ts">
import type { Pokemon } from 'pokenode-ts';
import PokemonCard from './PokemonCard.vue';
defineProps<{
    pokemonSuggestions: Pokemon[],
    input: string,
}>();
</script>

<template>
    <ul v-if="pokemonSuggestions.length > 0 && input.length > 0">
        <li v-for="pokemon in pokemonSuggestions" :key="pokemon.id">
            <PokemonCard :pokemon-card="pokemon" :suggestion="true" />
        </li>
    </ul>
</template>

<style scoped>
ul {
    max-height: 300px;
    overflow-y: scroll;
}
</style> -->