import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'CampaignSearchScreen',
    meta: {
      authenticated: false,
    },
    component: () => import(/* webpackChunkName: "campaign-search-screen" */ '@/views/public/CampaignSearchScreen.vue'),
  },
  {
    path: '/campaigns/:campaignId',
    name: 'CampaignScreen',
    meta: {
      authenticated: false,
    },
    component: () => import(/* webpackChunkName: "campaign-screen" */ '@/views/public/CampaignScreen.vue'),
  },
  {
    path: '/about-us',
    name: 'AboutUsScreen',
    meta: {
      authenticated: false,
    },
    component: () => import(/* webpackChunkName: "about-us-screen" */ '@/views/public/AboutUsScreen.vue'),
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
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/UserListScreen.vue'),
  },
  {
    path: '/admin/campaigns',
    name: 'CampaignListScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/CampaignListScreen.vue'),
  },
  {
    path: '/admin/users/:userId',
    name: 'UserProfileScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/UserProfileScreen.vue'),
  },
  {
    path: '/admin/campaigns/:campaignId',
    name: 'CampaignDetailsScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/CampaignDetailsScreen.vue'),
  },
  {
    path: '/admin/campaigns/:campaignId/resources/:resourceId',
    name: 'ResourceDetailsScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/ResourceDetailsScreen.vue'),
  },
  {
    path: '/admin/campaigns/:campaignId/resources/:resourceId/fulfillments/:fulfillmentId',
    name: 'FulfillmentDetailsScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/FulfillmentDetailsScreen.vue'),
  },
  {
    path: '/admin/organisation',
    name: 'OrganisationScreen',
    meta: {
      isAdmin: true,
    },
    component: () => import(/* webpackChunkName: "user-list-screen" */ '@/views/admin/OrganisationScreen.vue'),
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
