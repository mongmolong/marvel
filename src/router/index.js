import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Random from '../views/Random.vue';

const routes = [
  { path: '/', component: Home }, 
  { path: '/search', component: Search },  
  { path: '/random', component: Random },  
];

const router = createRouter({
  history: createWebHistory('/marvel/'),  
  routes,
});

export default router;
