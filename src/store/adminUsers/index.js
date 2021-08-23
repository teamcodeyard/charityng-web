import api from '@/api/adminUsers.api';

const defaultState = {
  adminUser: undefined,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    adminUser: (state) => state.adminUser,
  },
  mutations: {
    setAdminUser: (state, adminUser) => { state.adminUser = adminUser; },
    logout: (state) => Object.assign(state, defaultState),
  },
  actions: {
    authenticate: async (ctx, userParams) => {
      const response = await api.authenticate(userParams);
      ctx.commit('setAdminUser', response.data);
      return response.data;
    },
    logout: async (ctx) => {
      ctx.commit('logout');
      window.location.reload();
    },
  },
};
