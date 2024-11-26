<script setup lang="ts">
import { ref  } from 'vue';
import PokemonList from './components/PokemonList.vue';
import PokemonItem from './components/PokemonItem.vue';

// import { RouterLink, RouterView } from 'vue-router'

const pokemonName = ref("");
const input = ref("")

function updatePokemon() {
  pokemonName.value = input.value;
}

</script>

<template>
    <main>
      <input type="text" v-model="input">
      <button @click="updatePokemon">Submit</button>
      <div class="p-4">
        <PokemonList v-if="(pokemonName === '')" />
        <PokemonItem v-else :pokemonName="pokemonName"/>
      </div>
    </main>
</template>