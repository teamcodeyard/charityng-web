import api from '@/api/users.api';

const defaultState = {
  loggedInUserProfile: undefined,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    loggedInUserProfile: (state) => state.loggedInUserProfile,
  },
  mutations: {
    setLoggedInUserProfile: (state, loggedInUserProfile) => {
      state.loggedInUserProfile = loggedInUserProfile;
    },
  },
  actions: {
    login: async (ctx, payload) => {
      const response = await api.login(payload);
      const profile = response.data;
      ctx.commit('setLoggedInUserProfile', profile);
      ctx.commit('setUserApiKey', profile.apiKeys[0].token, { root: true });
      return profile;
    },
    logout: async (ctx) => {
      ctx.commit('setLoggedInUserProfile', undefined);
      ctx.commit('setUserApiKey', undefined, { root: true });
    },
    fetchProfile: async (ctx) => {
      const response = await api.fetchProfile();
      const profile = response.data;
      ctx.commit('setLoggedInUserProfile', profile);
      return profile;
    },
  },
};
