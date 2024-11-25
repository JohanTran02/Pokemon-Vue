<script setup lang="ts">
import { type Pokemon } from 'pokenode-ts';
import { computed } from 'vue';
const props = defineProps<{
  pokemon: Pokemon
}>()

const pokemonImg = computed(() => {
  if(!props.pokemon.sprites.other?.['official-artwork'].front_default) return "";
  return props.pokemon.sprites.other?.['official-artwork'].front_default as string ? props.pokemon.sprites.front_default as string : "";
});
</script>

<template>
  <p>{{ props.pokemon.name }}</p>
</template>