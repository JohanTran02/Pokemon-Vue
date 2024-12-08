<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';
defineProps<{
    pokemonSuggestions: PokemonObject[],
    input: string,
}>();
</script>

<template>
    <ul v-if="(pokemonSuggestions.length && input.length) > 0">
        <li v-for="pokemon in pokemonSuggestions" :key="pokemon.id">
            <PokemonCard :pokemon-id="pokemon.id" :suggestion="true" />
        </li>
    </ul>
</template>

<style scoped>
ul {
    max-height: 300px;
    overflow-y: scroll;
}
</style>