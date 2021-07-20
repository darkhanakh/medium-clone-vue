import * as feedApi from '@/api/feed';

export default {
  namespaced: true,
  state: () => ({
    data: null,
    error: null,
    isLoading: false,
  }),
  getters: {},
  mutations: {
    getFeedStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getFeedSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getFeedFailure(state) {
      state.isLoading = false;
    },
  },
  actions: {
    async getFeed({ commit }, { apiUrl }) {
      commit('getFeedStart');
      try {
        const responce = await feedApi.getFeed(apiUrl);
        commit('getFeedSuccess', responce.data);
        return Promise.resolve(responce.data);
      } catch (error) {
        commit('getFeedFailure');
        console.log('error: ', error);
      }
    },
  },
};
