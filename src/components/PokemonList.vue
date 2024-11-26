<script setup lang="ts">
import { AxiosError } from 'axios';
import { type NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { ref, watchEffect } from 'vue';
import PokemonItem from './PokemonItem.vue';

export interface PokemonAPIList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

const api = new PokemonClient();
const pokemon = ref<PokemonAPIList>(<PokemonAPIList>{})

watchEffect(async () => {
  try {
    pokemon.value = await api.listPokemons(0,12);
  }catch(error){
    if(error instanceof AxiosError){
      console.log(error.response);
    }
    else throw error;
  }
})
</script>

<template>
      <ul class="mx-auto">
          <li v-for="pokemonItem in (pokemon as PokemonAPIList).results" :key="(pokemonItem.name)">
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