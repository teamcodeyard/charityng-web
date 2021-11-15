import apiHelper from './apiHelper';

export default {
  fetchCampaigns: (params) => apiHelper.sendRequest('GET', `admin/campaigns?pageNumber=${params.pageNumber}&text=${params.text}`),
  fetchCampaign: (campaignId) => apiHelper.sendRequest('GET', `admin/campaigns/${campaignId}`),
  uploadImages: (campaignId, formData) => apiHelper.uploadFile('POST', `admin/campaigns/${campaignId}/media`, formData),
  sendMessage: (campaignId, resourceId, fulfillmentId, message) => apiHelper.sendRequest('POST', `admin/campaigns/${campaignId}/resources/${resourceId}/fulfillments/${fulfillmentId}`, { message }),
  createCampaign: (campaign) => apiHelper.sendRequest('POST', 'admin/campaigns', { campaign }),
  addResource: (campaignId, resource) => apiHelper.sendRequest('POST', `admin/campaigns/${campaignId}/resources`, { resource }),
  updateStatus: (campaignId, status) => apiHelper.sendRequest('POST', `admin/campaigns/${campaignId}/updateStatus`, { status }),
};
