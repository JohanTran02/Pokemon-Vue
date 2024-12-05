<script setup lang="ts">
import { ref } from 'vue';
import PokemonList from './PokemonList.vue';
// import PokemonItem from './PokemonItem.vue';

const pokemonName = ref("");
const input = ref("")

function updatePokemon() {
  pokemonName.value = input.value;
}
</script>

<template>
  <input type="text" v-model="input">
  <button @click="updatePokemon">Submit</button>
  <div class="p-4">
    <PokemonList v-if="(pokemonName === '')" />
    <!-- <PokemonItem v-else :pokemonId="pokemonId"/> -->
  </div>
</template>