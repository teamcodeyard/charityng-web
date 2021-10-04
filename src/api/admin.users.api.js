import apiHelper from './apiHelper';

export default {
  fetchUsers: (params) => apiHelper.sendRequest('GET', `admin/users?pageNumber=${params.pageNumber}&text=${params.text}`),
  fetchUser: (userId) => apiHelper.sendRequest('GET', `admin/users/${userId}`),
};
