<script setup lang="ts">
import type { Pokemon, PokemonType } from 'pokenode-ts';

const props = defineProps<{
    pokemonTypes? : PokemonType[],
    pokemonProperty? : Pokemon,
    title: string,
}>();
</script>

<!-- Fortsätt med att göra en komponent för pokemon properties. -->
<template>
    <div v-if="pokemonTypes">
        <h1 class="font-bold text-2xl">{{props.title}}</h1>
        <div class="flex gap-3">
            <p v-for="types in pokemonTypes" :key="types.type.name" class="bg-blue-400 p-1 rounded-md text-xl">{{ types.type.name }}</p>
        </div>
    </div>

    <div v-if="pokemonProperty">
        <h1>height</h1>
        <p class="lowercase">{{ pokemonProperty.height / 10}} m</p>
    </div>
</template>