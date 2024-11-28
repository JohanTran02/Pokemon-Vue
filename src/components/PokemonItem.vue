<script setup lang="ts">
import { AxiosError } from 'axios';
import { PokemonClient, type Pokemon } from 'pokenode-ts';
import { computed, ref, watchEffect } from 'vue';
const props = defineProps<{
  pokemonName: string,
}>()

const api = new PokemonClient();
const pokemon = ref<Pokemon>({} as Pokemon)
const loading = ref<boolean>(false);

const pokemonImg = computed(() => {
  const pokemonImage : string = pokemon.value.sprites.other?.['official-artwork'].front_default as string ?? pokemon.value.sprites.front_default as string;
  return pokemonImage; 
});

watchEffect(async () => {
  await getPokemon();
})

async function getPokemon () {
  loading.value = true;
  try{
    pokemon.value = await api.getPokemonByName(props.pokemonName);
  }catch(error){
    if(error instanceof AxiosError){
      console.log(error.response);
    }
    else throw error;
  }finally{
    loading.value = false
  }
}
</script>

<template>
  <div v-if="!loading" class="capitalize">
    <RouterLink :to="`pokemon/${props.pokemonName}`" ><img :src="pokemonImg" :alt="pokemon.name" class="w-full object-cover bg-slate-400"></RouterLink>
    <p>#{{ pokemon.id }}</p>
    <h1 class="font-bold text-xl py-2">{{ pokemon.name }}</h1>
    <div class="flex gap-2">
      <p v-for="types in pokemon.types" :key="types.type.name" class="bg-blue-400 p-1 rounded-md">{{ types.type.name }}</p>
    </div>
  </div>
</template>