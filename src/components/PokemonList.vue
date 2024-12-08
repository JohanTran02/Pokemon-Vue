<script setup lang="ts">
import { watch } from 'vue';
import PokemonCard from './PokemonCard.vue';
import store from '@/store/pokemon';

const { getPokemonList, } = store;

watch(store.pokemonList, getPokemonList, { immediate: true })

</script>

<template>
  <ul v-if="store.pokemonList" class="mx-auto">
    <li v-for="PokemonCard in store.pokemonList.results" :key="(PokemonCard.id)">
      <PokemonCard :pokemonId="PokemonCard.id" />
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