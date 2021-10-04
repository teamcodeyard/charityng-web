import api from '@/api/admin.users.api';

const defaultState = {
  users: undefined,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    users: (state) => state.users,
  },
  mutations: {
    setUsers: (state, users) => { state.users = users; },
  },
  actions: {
    fetchUsers: async (ctx, params) => {
      const response = await api.fetchUsers(params);
      ctx.commit('setUsers', response.data);
      return response.data;
    },
    fetchUser: async (ctx, userId) => {
      const response = await api.fetchUser(userId);
      return response.data;
    },
  },
};
