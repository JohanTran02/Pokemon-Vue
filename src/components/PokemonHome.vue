<script setup lang="ts">
import { ref, watch } from 'vue';
import PokemonList from './PokemonList.vue';
import { store } from '@/store';
import { getAllPokemons } from './functions/fetch';
import PokemonInput from './PokemonInput.vue';
// import PokemonItem from './PokemonItem.vue';

const loading = ref<boolean>(false)

watch(store.pokemons, async () => {
  loading.value = true;
  if (store.pokemons.length === 0) {
    store.pokemons = await getAllPokemons();
    loading.value = true;
  }
}, { immediate: true })

</script>

<template>
  <PokemonInput />
  <div class="p-4">
    <PokemonList />
    <!-- <PokemonItem v-else :pokemonId="pokemonId"/> -->
  </div>
</template>