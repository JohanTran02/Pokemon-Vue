<script setup lang="ts">
import { AxiosError } from 'axios';
import { PokemonClient, type NamedAPIResource, type Pokemon } from 'pokenode-ts';
import { ref, watchEffect } from 'vue';
import PokemonItem from './components/PokemonItem.vue';
// import { RouterLink, RouterView } from 'vue-router'

const pokemonName = ref("");
const input = ref("")
const api = new PokemonClient();
const pokemon = ref<Pokemon | PokemonAPIList>(<Pokemon | PokemonAPIList>{})

export interface PokemonAPIList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

function updatePokemon() {
  pokemonName.value = input.value;
}

watchEffect(async () => {
  try {
    if(pokemonName.value === ""){
      const response = await api.listPokemons();
      pokemon.value = response;
    }else{
      const response = await api.getPokemonByName(pokemonName.value);
      pokemon.value = response;
      console.log(response);
    }
  }catch(error){
    if(error instanceof AxiosError){
      console.log(error.response);
    }
    else throw error;
  }
})
</script>

<template>
    <div>
      <input type="text" v-model="input">
      <button @click="updatePokemon">Submit</button>
      <p>{{input}}</p>
      <ul>
          <li v-for="pokemonItem in (pokemon as PokemonAPIList).results" :key="(pokemonItem.name)">
            {{pokemonItem.name}}
          </li>
      </ul>
      <div>
        <PokemonItem :pokemon="(pokemon as Pokemon)"/>
      </div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>

  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
