import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import adminUsers from './adminUsers';
import usersAtAdmin from './admin.users';
import campaignsAtAdmin from './admin.campaigns';
import organisation from './organisation';

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
    'admin.users': usersAtAdmin,
    'admin.campaigns': campaignsAtAdmin,
    organisation,
  },
  plugins: [createPersistedState({
    key: 'store',
    paths: ['adminUsers.adminUser'],
  })],
});
