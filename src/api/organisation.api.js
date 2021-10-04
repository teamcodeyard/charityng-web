import apiHelper from './apiHelper';

export default {
  get: () => apiHelper.sendRequest('GET', 'admin/organisation'),
  update: (params) => apiHelper.sendRequest('POST', 'admin/organisations/update', { ...params }),
};
