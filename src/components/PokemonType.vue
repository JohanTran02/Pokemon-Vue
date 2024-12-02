<script setup lang="ts">
import type { Pokemon, PokemonType } from 'pokenode-ts';

const props = defineProps<{
    pokemonTypes?: PokemonType[],
    pokemonWeaknesses?: string[],
    pokemonProperty?: Pokemon,
    title: string,
}>();
</script>

<!-- Fortsätt med att göra en komponent för pokemon properties. -->
<template>
    <!-- Använde AI för att refaktorisera koden -->
    <div v-if="['type', 'weaknesses'].includes(title)">
        <h1 class="font-bold text-2xl">{{ props.title }}</h1>
        <div class="flex gap-3">
            <template v-if="title === 'type'">
                <p v-for="types in pokemonTypes" :key="types.type.name" class="bg-blue-400 p-1 rounded-md text-xl">
                    {{ types.type.name }}</p>
            </template>
            <template v-else>
                <p v-for="weakness in pokemonWeaknesses" :key="weakness" class="bg-blue-400 p-1 rounded-md text-xl">
                    {{ weakness }}</p>
            </template>
        </div>
    </div>
</template>
