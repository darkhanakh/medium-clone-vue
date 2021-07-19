import axios from 'axios';

import { getItem } from '@/helpers/persistentStorage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.interceptors.request.use(function (config) {
  const authToken = getItem('accessToken')
    ? `Token ${getItem('accessToken')}`
    : '';
  config.headers.Authorization = authToken;
  return config;
});

export default axios;
