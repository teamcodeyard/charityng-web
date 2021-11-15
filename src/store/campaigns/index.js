import api from '@/api/campaigns.api';

const defaultState = {
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
  },
  mutations: {
  },
  actions: {
    filterCampaigns: async (ctx, params) => {
      const response = await api.filterCampaigns(params);
      return response.data;
    },
    fetchCampaign: async (ctx, campaignId) => {
      const response = await api.fetchCampaign(campaignId);
      return response.data;
    },
    createFulfillment: async (ctx, params) => {
      const response = await api.createFulfillment(params);
      return response.data;
    },
    listFulfilledCampaigns: async () => {
      const response = await api.listFulfilledCampaigns();
      return response.data;
    },
    sendMessage: async (ctx, params) => {
      const response = await api.sendMessage(params);
      return response.data;
    },
  },
};
