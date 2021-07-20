import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
} from '@/store/types/mutationTypes';
import { REGISTER, LOGIN, GET_CURRENT_USER } from '@/store/types/actionTypes';
import {
  CURRENT_USER,
  IS_LOGGED_IN,
  IS_SUBMITTING,
  VALIDATION_ERRORS,
  IS_ANONYMOUS,
} from '@/store/types/getterTypes';

export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
    isLoading: false,
  },
  getters: {
    [IS_SUBMITTING]: state => state.isSubmitting,
    [VALIDATION_ERRORS]: state => state.validationErrors,
    [CURRENT_USER]: state => state.currentUser,
    [IS_LOGGED_IN]: state => !!state.isLoggedIn,
    [IS_ANONYMOUS]: state => state.isLoggedIn === false,
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
    [GET_CURRENT_USER_START](state) {
      state.isLoading = true;
    },
    [GET_CURRENT_USER_SUCCESS](state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [GET_CURRENT_USER_FAILURE](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
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

    async [GET_CURRENT_USER]({ commit }) {
      commit(GET_CURRENT_USER_START);
      try {
        const responce = await authApi.getCurrentUser();
        commit(GET_CURRENT_USER_SUCCESS, responce.data.user);
        return Promise.resolve(responce.data.user);
      } catch (error) {
        commit(GET_CURRENT_USER_FAILURE);
        console.log(error);
      }
    },
  },
};
