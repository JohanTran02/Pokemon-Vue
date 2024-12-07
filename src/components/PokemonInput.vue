<script setup lang="ts">
import { store } from '@/store';
import { onWatcherCleanup, ref, watch } from 'vue';
import PokemonItem from './PokemonItem.vue';

// const pokemonSuggestions = ref<Pokemon>({} as Pokemon)
const inputValue = ref("")
// const debouncedValue = ref(""); // The debounced result
const pokemonSuggestions = ref<PokemonObject[]>([])

// Debouncing logic inside a watchEffect
let timeout: ReturnType<typeof setTimeout>; // For debouncing

watch(inputValue, (debouncedValue) => {
    const pattern = new RegExp("^" + debouncedValue, "gi")
    timeout = setTimeout(async () => {
        // debouncedValue.value = newValue;
        if (store.pokemons.length > 0) {
            pokemonSuggestions.value = store.pokemons.filter((pokemon) => pokemon.name.match(pattern)) // Filter by name
        }
        console.log(pokemonSuggestions.value)
    }, 500);

    onWatcherCleanup(() => clearTimeout(timeout));
});

</script>

<template>
    <div class="flex justify-center ">
        <input type="text" v-model="inputValue">
        <button>Submit</button>
    </div>

    <ul v-if="(pokemonSuggestions.length && inputValue.length) > 0">
        <li v-for="pokemon in pokemonSuggestions" :key="pokemon.id">
            <PokemonItem :pokemon-id="pokemon.id" :suggestion="true" />
        </li>
    </ul>
</template>

<style scoped>
ul {
    height: 300px;
    overflow-y: scroll;
}
</style>