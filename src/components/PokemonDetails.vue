<script setup lang="ts">
import { store } from '@/store';
import { AxiosError } from 'axios';
import { type Pokemon, type PokemonSpecies, type Type} from 'pokenode-ts';
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
    name : string
}>();

const pokemon = ref<Pokemon>({} as Pokemon);
const pokemonDesc = ref<PokemonSpecies>({} as PokemonSpecies);
// const pokemonTypes = ref<Type[]>([]);
const loading = ref<boolean>(false);

interface PokemonStats{
    base_stat: number;
    effort: number;
    name: string;
}  

interface PokemonAbilities{
    is_hidden: boolean;
    slot: number;
    ability : {
        name: string,
        url?: string
    }
}

// interface PokemonTypes{
//     weakness: {
//         double_damage_from:{name: string}[],
//         half_damage_to: {name: string}[],
//     },
//     strength: {
//         double_damage_to:{name : string}[],
//         half_damage_from:{name: string}[],
//     }
// }

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

const pokemonAbiliites = computed(() => {
    const abilities: PokemonAbilities[] = pokemon.value.abilities.map((ability) => {
        return {
            is_hidden: ability.is_hidden,
            slot: ability.slot,
            ability: {
                name: ability.ability.name,
            }
        }
    })
    return abilities;
})

// const pokemonTypes = computed(() => {
//     const types: PokemonTypes = pokemon.value.types.map((type) => {
//         return {
//             weakness: {
//                 double_damage_from : [{name: type.type.name}],
//                 half_damage_to : [{name: type.type.name}],
//             },
//             strength : {
//                 double_damage_from : [{name: type.type.name}],
//                 half_damage_to : [{name: type.type.name}]
//             }
//         }
//     })
//     return types;
// })

watchEffect(async () => {
    await PokemonData();
})

async function PokemonData() {
    loading.value = true
    try{
        const [pokemonValue,pokemonDescValue,pokemonTypesValue] : [Pokemon,PokemonSpecies,Type[]] = await Promise.all([getPokemon(),getPokemonDesc(),getPokemonTypes()]);
        pokemon.value = pokemonValue;
        pokemonDesc.value = pokemonDescValue;
        pokemonTypesValue.push(...pokemonTypesValue);
        loading.value = false;  
    }
    catch(error){
        if(error instanceof AxiosError){
        console.log(error.response);
        }
        throw error;
    }
}

async function getPokemon () : Promise<Pokemon> {
    try{
        const response = await store.pokemonEndpoints.getPokemonByName(props.name) ;
        if(!response) throw new Error("Pokemon data is missing");
        return response;
    }catch(error){
        if(error instanceof AxiosError){
        console.log(error.response);
        }
        throw error;
    }
}

async function getPokemonDesc () : Promise<PokemonSpecies> {
    try{
        const response = await store.pokemonEndpoints.getPokemonSpeciesByName(props.name);
        if(!response) throw new Error("Pokemon data is missing");
        return response;;
    }catch(error){
        if(error instanceof AxiosError){
        console.log(error.response);
        }
        throw error;
    }
}

async function getPokemonTypes () : Promise<Type[]>{
    try{
        const pokemon = await store.pokemonEndpoints.getPokemonByName(props.name);

        const types = pokemon.types.map((type) => {
            return store.pokemonEndpoints.getTypeByName(type.type.name);
        })
        const responses = await Promise.all(types);

        if(!responses) throw new Error("Pokemon data is missing");
        
        return responses;
    }catch(error){
        if(error instanceof AxiosError){
        console.log(error.response);
        }
        throw error;
    }
}

</script>

<template>
    <div class="mx-auto">
        <div v-if="!loading" class="p-4" >
            <img :src="pokemonImg" :alt="pokemon.name" class="w-full object-cover bg-slate-400">
            <p class="break-keep">{{ pokemonDesc.flavor_text_entries[3].flavor_text }}</p>
            <p>{{ pokemon.height / 10}} m</p>
            <p>{{ pokemon.name }}</p>
            <p>{{ pokemon.weight / 10}} kg</p>
            <p>{{ pokemon.id }}</p>
            <template v-for="abilities in pokemonAbiliites" :key="abilities">
                <p v-if="!abilities.is_hidden">{{ abilities.ability.name }}</p>
            </template>
            <div class="flex gap-2">
                <p v-for="types in pokemon.types" :key="types.type.name" class="bg-blue-400 p-1 rounded-md">{{ types.type.name }}</p>
            </div>
            <div>
                <h1 class="text-2xl">Stats</h1>
                <p v-for="stats in pokemonStats" :key="stats.name">{{ stats.name }}:{{ stats.base_stat }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    div{
        max-width: 970px;
    }
</style>