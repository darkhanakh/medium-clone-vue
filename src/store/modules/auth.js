import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';

export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: state => state.isSubmitting,
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    async register({ commit }, credentials) {
      let user = {};
      commit('registerStart');
      try {
        const response = await authApi.register(credentials);
        commit('registerSuccess', response.data.user);
        user = response.data.user;
        setItem('accessToken', user.token);
      } catch (error) {
        console.error(error);
        commit('registerFailure', error.response.data.errors);
      }
      return Promise.resolve(user);
    },
  },
};
