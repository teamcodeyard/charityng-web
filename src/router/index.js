import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
  },
  {
    path: '/admin/login',
    name: 'LoginScreen',
    component: () => import(/* webpackChunkName: "login-screen" */ '@/views/admin/LoginScreen.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
