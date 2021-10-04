import api from '@/api/organisation.api';

const defaultState = {
  organisation: undefined,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    organisation: (state) => state.organisation,
  },
  mutations: {
    setOrganisation: (state, organisation) => { state.organisation = organisation; },
  },
  actions: {
    fetchOrganisation: async (ctx) => {
      const response = await api.get();
      ctx.commit('setOrganisation', response.data);
      return response.data;
    },
    updateOrganisation: async (ctx, params) => {
      const response = await api.update(params);
      ctx.commit('setOrganisation', response.data);
      return response.data;
    },
  },
};
