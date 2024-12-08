<script setup lang="ts">
import { watch } from 'vue';
import PokemonCard from './PokemonCard.vue';
import store from '@/store/pokemon';

const { getPokemonList } = store;

watch(store.pokemonCards, getPokemonList, { immediate: true })

</script>

<template>
  <div v-if="store.pokemonCards && store.pokemonCards.length > 0">
    <ul class="mx-auto">
      <li v-for="pokemonCard in store.pokemonCards" :key="pokemonCard.id">
        <PokemonCard :pokemonCard="pokemonCard" />
      </li>
    </ul>
    <div class="flex justify-center ">
      <button @click="store.incrementOffset" class=" bg-blue-400 my-4 p-2 rounded-md">Load more Pokémons</button>
    </div>
  </div>
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