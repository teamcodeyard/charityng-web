const axios = require('axios');

const BASE_URL = 'http://localhost:3000/';

const sendRequest = (method, path, data, headers) => {
  const url = `${BASE_URL}${path}`;
  return axios({
    method,
    url,
    data,
    headers,
  });
};

export default {
  sendRequest,
};
