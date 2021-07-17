import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '@/store/mutationTypes';
import { REGISTER, LOGIN } from '@/store/actionTypes';

export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: state => state.isSubmitting,
    validationErrors: state => state.validationErrors,
    currentUser: state => state.currentUser,
    isLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    [REGISTER_START](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [REGISTER_SUCCESS](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [REGISTER_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [LOGIN_START](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [LOGIN_SUCCESS](state, payload) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.currentUser = payload;
    },
    [LOGIN_FAILURE](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    async [REGISTER]({ commit }, credentials) {
      let user = {};
      commit(REGISTER_START);
      try {
        const response = await authApi.register(credentials);
        commit(REGISTER_SUCCESS, response.data.user);
        user = response.data.user;
        setItem('accessToken', user.token);
      } catch (error) {
        commit(REGISTER_FAILURE, error.response.data.errors);
        throw new Error(error);
      }
      return Promise.resolve(user);
    },

    async [LOGIN]({ commit }, userData) {
      let user = {};
      commit(LOGIN_START);
      try {
        const responce = await authApi.login(userData);
        user = responce.data.user;
        commit(LOGIN_SUCCESS, user);
        setItem('accessToken', user.token);
      } catch (error) {
        commit(LOGIN_FAILURE, error.response.data.errors);
        throw new Error(error);
      }
      return Promise.resolve(user);
    },
  },
};
