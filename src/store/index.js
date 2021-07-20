import { createStore } from 'vuex';
import { authModule, feedModule } from './modules';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    feed: feedModule,
  },
});
