import { createStore } from 'vuex';
import { authModule } from './modules';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
  },
});
