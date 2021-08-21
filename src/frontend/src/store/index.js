import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "./modules";
import { SET_ENTITY } from "./mutations-types";

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
    commit(SET_ENTITY, {
      module: null,
      entity: "isLoading",
      value,
    });
  },
};

export const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
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
