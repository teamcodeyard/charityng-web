import apiHelper from './apiHelper';

export default {
  login: (payload) => apiHelper.sendRequest('POST', 'api/users/login', payload),
  fetchProfile: () => apiHelper.sendRequest('GET', 'api/users/me'),
};
