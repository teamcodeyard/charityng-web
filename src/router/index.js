import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

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
    meta: {
      authenticated: false,
    },
  },
  {
    path: '/admin/users',
    name: 'UserListScreen',
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/UserListScreen.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // TODO: handle end user authentication
  const adminUser = store.getters['adminUsers/adminUser'];
  if (to.meta.authenticated === false || adminUser) {
    next();
  }
  next('/admin/login');
});

export default router;
