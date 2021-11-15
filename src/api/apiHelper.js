const axios = require('axios');

const BASE_URL = 'http://localhost:3000/';

const getAdminApiKey = () => {
  const store = window.localStorage.getItem('store');
  if (store) {
    const jsonStore = JSON.parse(store);
    if (jsonStore.adminUsers && jsonStore.adminUsers.adminUser
      && jsonStore.adminUsers.adminUser.apiKeys[0]) {
      return jsonStore.adminUsers.adminUser.apiKeys[0].token;
    }
    return undefined;
  }
  return undefined;
};

const getUserApiKey = () => {
  const store = window.localStorage.getItem('store');
  if (store) {
    const jsonStore = JSON.parse(store);
    return jsonStore.userApiKey;
  }
  return undefined;
};

const sendRequest = async (method, path, data) => {
  const url = `${BASE_URL}${path}`;
  let apiKey = getUserApiKey();
  if (path.startsWith('admin/')) {
    apiKey = getAdminApiKey();
  }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (apiKey) {
    headers['api-key'] = apiKey;
  }
  return axios({
    method,
    url,
    data,
    headers,
  });
};

const uploadFile = async (method, path, data) => {
  const url = `${BASE_URL}${path}`;

  const apiKey = getAdminApiKey();
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    //  ...data.getHeaders(),
  };
  if (apiKey) {
    headers['api-key'] = apiKey;
  }
  return axios({
    method,
    url,
    data,
    headers,
  });
};

export default {
  sendRequest,
  uploadFile,
};
