import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "./modules";
import { SET_LOADING } from "./mutations-types";

Vue.use(Vuex);

export const state = () => ({
  isLoading: false,
});

export const actions = {
  async init({ dispatch }) {
    dispatch("setLoading", true);
    await Promise.all([dispatch("Builder/query")]);
    dispatch("setLoading", false);
  },

  setLoading({ commit }, value) {
    commit(SET_LOADING, value);
  },
};

export const mutations = {
  [SET_LOADING](state, value) {
    state.isLoading = value;
  },
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});

export default store;
