import api from '@/api/admin.campaigns.api';

const defaultState = {
  campaigns: undefined,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    campaigns: (state) => state.campaigns,
  },
  mutations: {
    setCampaigns: (state, campaigns) => { state.campaigns = campaigns; },
    addCampaign: (state, campaign) => { state.campaigns.list.push(campaign); },
  },
  actions: {
    fetchCampaigns: async (ctx, params) => {
      const response = await api.fetchCampaigns(params);
      ctx.commit('setCampaigns', response.data);
      return response.data;
    },
    fetchCampaign: async (ctx, campaignId) => {
      const response = await api.fetchCampaign(campaignId);
      return response.data;
    },
    uploadImages: async (ctx, params) => {
      const { campaignId, formData } = params;
      const response = await api.uploadImages(campaignId, formData);
      return response.data;
    },
    sendMessage: async (ctx, params) => {
      const {
        campaignId, resourceId, fulfillmentId, message,
      } = params;
      const response = await api.sendMessage(campaignId, resourceId, fulfillmentId, message);
      return response.data;
    },
    createCampaign: async (ctx, params) => {
      const response = await api.createCampaign(params);
      ctx.commit('addCampaign', response.data);
      return response.data;
    },
    createResource: async (ctx, params) => {
      const response = await api.addResource(params.campaignId, params.resource);
      return response.data;
    },
    updateStatus: async (ctx, params) => {
      const response = await api.updateStatus(params.campaignId, params.status);
      return response.data;
    },
  },
};
