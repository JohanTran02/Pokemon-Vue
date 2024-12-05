<script setup lang="ts">
import { watch } from 'vue';
import PokemonItem from './PokemonItem.vue';
import { store } from '@/store';
import { getPokemonList } from './functions/fetch';

watch(store.pokemonList, getPokemonList, { immediate: true })
</script>

<template>
  <ul v-if="store.pokemonList" class="mx-auto">
    <li v-for="pokemonItem in store.pokemonList.results" :key="(pokemonItem.id)">
      <PokemonItem :pokemonId="pokemonItem.id" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  max-width: 970px;
}
</style>