import api from '@/api/adminUsers.api';

export default {
  namespaced: true,
  state: {
    adminUser: undefined,
  },
  getters: {
    adminUser: (state) => state.adminUser,
  },
  mutations: {
    setAdminUser: (state, adminUser) => { state.adminUser = adminUser; },
  },
  actions: {
    authenticate: async (ctx, userParams) => {
      const response = await api.authenticate(userParams);
      ctx.commit('setAdminUser', response.data);
      return response.data;
    },
  },
};
