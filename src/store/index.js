import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import adminUsers from './adminUsers';
import usersAtAdmin from './admin.users';
import campaignsAtAdmin from './admin.campaigns';
import campaigns from './campaigns';
import organisation from './organisation';
import users from './users';

export default createStore({
  state: {
    userApiKey: undefined,
  },
  mutations: {
    setUserApiKey: (state, userApiKey) => {
      state.userApiKey = userApiKey;
    },
  },
  actions: {
  },
  getters: {
    userApiKey: (state) => state.userApiKey,
  },
  modules: {
    adminUsers,
    'admin.users': usersAtAdmin,
    'admin.campaigns': campaignsAtAdmin,
    organisation,
    campaigns,
    users,
  },
  plugins: [createPersistedState({
    key: 'store',
    paths: ['adminUsers.adminUser', 'organisation.organisation', 'userApiKey'],
  })],
});
