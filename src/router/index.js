import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue'; // 각 페이지 컴포넌트 경로에 맞게 수정
import Marvel from '../views/Random.vue';
import Movie from '../views/Search.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movie', component: Movie },
  { path: '/marvel', component: Marvel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
