<script setup lang="ts">
import { AxiosError } from 'axios';
import { watch } from 'vue';
import PokemonItem from './PokemonItem.vue';
import { store } from '@/store';

watch(store.pokemonList, async () => {
  try {
    store.pokemonList = await store.pokemonEndpoints.listPokemons(0,12);
  }catch(error){
    if(error instanceof AxiosError){
      console.log(error.response);
    }
    else throw error;
  }
}, {immediate:true})
</script>

<template>
      <ul class="mx-auto">
          <li v-for="pokemonItem in store.pokemonList.results" :key="(pokemonItem.name)">
            <PokemonItem :pokemonName="pokemonItem.name"/>
          </li>
      </ul>
</template>

<style scoped>
  ul{
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
    gap: 10px;
    max-width: 970px;
  }
</style>