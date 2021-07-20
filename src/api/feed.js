import axios from '@/api/axios';

export const getFeed = url => {
  return axios.get(url);
};
