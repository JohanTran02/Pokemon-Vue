import { createMemoryHistory, createRouter } from 'vue-router'
import PokemonHome from './components/PokemonHome.vue'
import PokemonDetails from './components/PokemonDetails.vue'

const routes = [
    { path: '/', component: PokemonHome },
    { path: '/pokemon/:id', component: PokemonDetails, props: true },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router