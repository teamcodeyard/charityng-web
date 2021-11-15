import apiHelper from './apiHelper';

export default {
  filterCampaigns: (params) => apiHelper.sendRequest('GET', `api/campaigns/filter?status=${params.status || 1}&text=${params.searchText}`),
  fetchCampaign: (campaignId) => apiHelper.sendRequest('GET', `api/campaigns/${campaignId}`),
  createFulfillment: (params) => apiHelper.sendRequest('POST', `api/campaigns/${params.campaignId}/fulfillments`, params.body),
  listFulfilledCampaigns: () => apiHelper.sendRequest('GET', 'api/fulfillments'),
  sendMessage: (params) => apiHelper.sendRequest('POST', `api/campaigns/${params.campaignId}/fulfillments/${params.fulfillmentId}`, { message: params.message }),
};
