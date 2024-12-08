<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import store from '@/store/pokemon';

const { getAllPokemons } = store;

onMounted(async () => {
  if (store.pokemons.length === 0) {
    await getAllPokemons();
  }
})

</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>