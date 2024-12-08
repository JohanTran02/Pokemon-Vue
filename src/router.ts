import { createWebHistory, createRouter } from 'vue-router'
import PokemonHome from './components/PokemonHome.vue'
import PokemonDetails from './components/PokemonDetails.vue'
import NotFound from './components/NotFound.vue'

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: "home", component: PokemonHome },
    { path: '/pokemon/:id', name: "pokemon", component: PokemonDetails, props: true },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router