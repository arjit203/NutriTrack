const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://api.edamam.com/api',
});

module.exports = apiClient;
