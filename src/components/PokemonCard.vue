<script setup lang="ts">
import { type Pokemon } from 'pokenode-ts';
import { computed } from 'vue';

const props = defineProps<{
  pokemonCard: Pokemon,
  suggestion?: boolean
}>()

const pokemonImg = computed(() => {
  let pokemonImage: string = "";
  if (props.pokemonCard.sprites) {
    pokemonImage = props.pokemonCard.sprites.other?.['official-artwork'].front_default as string ?? props.pokemonCard.sprites.front_default as string;
  }
  return pokemonImage;
})
</script>

<template>
  <div class="capitalize">
    <template v-if="!suggestion">
      <RouterLink :to="`/pokemon/${pokemonCard.id}`"><img :src="pokemonImg" :alt="pokemonCard.name"
          class="w-full object-cover bg-slate-400"></RouterLink>
      <p class="text-lg">#{{ pokemonCard.id }}</p>
      <h1 class="font-bold text-xl pb-2">{{ pokemonCard.name }}</h1>
      <div class="flex gap-2">
        <p v-for="types in pokemonCard.types" :key="types.type.name" class="bg-blue-400 p-1 rounded-md">{{
          types.type.name
        }}
        </p>
      </div>
    </template>
    <template v-else>
      <RouterLink :to="`/pokemon/${pokemonCard.id}`" class="flex bg-slate-400 border border-slate-700">
        <img :src="pokemonImg" :alt="pokemonCard.name" class="size-24 object-cover">
        <div>
          <p>#{{ pokemonCard.id }}</p>
          <h1 class="font-bold text-xl">{{ pokemonCard.name }}</h1>
          <div class="flex gap-2">
            <p v-for="types in pokemonCard.types" :key="types.type.name" class="bg-blue-400 p-1 rounded-md">{{
              types.type.name
            }}
            </p>
          </div>
        </div>
      </RouterLink>
    </template>
  </div>
</template>