<script setup lang="ts">
import { AxiosError } from 'axios';
import { PokemonClient, type Pokemon, type PokemonSpecies} from 'pokenode-ts';
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
    name : string
}>();

const api = new PokemonClient();
const pokemon = ref<Pokemon>({} as Pokemon);
const pokemonDesc = ref<PokemonSpecies>({} as PokemonSpecies);
const loading = ref<boolean>(false);

interface PokemonStats{
    base_stat: number;
    effort: number;
    name: string;
}  

const pokemonImg = computed(() => {
    let pokemonImage: string = "";
    if(pokemon.value.sprites){
        pokemonImage = pokemon.value.sprites.other?.['official-artwork'].front_default as string ?? pokemon.value.sprites.front_default as string;
    }
    return pokemonImage; 
});

const pokemonStats = computed(() => {
    const stats: PokemonStats[] = pokemon.value.stats.map((stat) => {
        return {
            base_stat: stat.base_stat,
            effort: stat.effort,
            name: stat.stat.name
            }
        })
    return stats;
});
watchEffect(async () => {
  await getPokemon();
})

async function getPokemon () {
    loading.value = true;
  try{
    pokemon.value = await api.getPokemonByName(props.name);
    pokemonDesc.value = await api.getPokemonSpeciesByName(props.name);
    console.log(pokemon.value, pokemonDesc.value)
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
    <div class="mx-auto">
        <div v-if="!loading" class="p-4" >
            <img :src="pokemonImg" :alt="pokemon.name" class="w-full object-cover bg-slate-400">
            <p class="break-keep">{{ pokemonDesc.flavor_text_entries[3].flavor_text }}</p>
            <p>{{ pokemon.height }}</p>
            <p>{{ pokemon.name }}</p>
            <p>{{ pokemon.weight }}</p>
            <p>{{ pokemon.id }}</p>
            <p v-for="stats in pokemonStats" :key="stats.name">{{ stats.name }}:{{ stats.base_stat }}</p>
        </div>
    </div>
</template>

<style scoped>
    div{
        max-width: 970px;
    }
</style>