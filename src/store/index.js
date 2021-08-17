import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import adminUsers from './adminUsers';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    adminUsers,
  },
  plugins: [createPersistedState({
    key: 'store',
    paths: ['adminUsers.adminUser'],
  })],
});
