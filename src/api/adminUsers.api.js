import apiHelper from './apiHelper';

export default {
  authenticate: (userParams) => apiHelper.sendRequest('POST', 'admin/users/login', userParams),
};
