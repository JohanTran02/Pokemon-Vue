<script setup lang="ts">
import { ref } from 'vue';
import store from '@/store/pokemon';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
// import PokemonSuggestions from './PokemonSuggestions.vue';
// import type { Pokemon } from 'pokenode-ts';

const inputValue = ref("")
const router = useRouter();
// const pokemonSuggestions = ref<Pokemon[]>([])
// const debouncedValue = ref("");

const { getPokemonByName } = store;

// // Debouncing logic inside a watchEffect
// let timeout: ReturnType<typeof setTimeout>; // For debouncing

// watch(inputValue, (newValue) => {
//     timeout = setTimeout(async () => {
//         const pattern = new RegExp("^" + newValue, "gi")
//         debouncedValue.value = inputValue.value;
//         if (store.pokemons.length > 0) {
//             pokemonSuggestions.value = store.pokemons.filter((pokemon) => pokemon.name.match(pattern)) // Filter by name
//         }
//     }, 500);

//     onWatcherCleanup(() => clearTimeout(timeout));
// });

async function getPokemon(input: string) {
    try {
        const pokemon = await getPokemonByName(input);
        await router.push({ name: "pokemon", params: { id: pokemon.id } })
    } catch (error) {
        if (error instanceof AxiosError) {
            await router.push({ name: "NotFound" })
        }
    }
}

</script>

<template>
    <div class="flex justify-center ">
        <input type="text" v-model="inputValue" class="border border-black">
        <button @click="getPokemon(inputValue)">Submit</button>
    </div>
    <!-- <PokemonSuggestions :pokemon-suggestions="pokemonSuggestions" :input="debouncedValue" /> -->
</template>