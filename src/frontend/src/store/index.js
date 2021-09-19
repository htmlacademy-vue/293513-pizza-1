import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "./modules";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
} from "./mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

Vue.use(Vuex);

export const state = () => ({
  isLoading: false,
  notifications: [],
});

export const actions = {
  async init({ dispatch }) {
    dispatch("setLoading", true);
    await dispatch("Builder/query");
    dispatch("setLoading", false);
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: Date.now(),
    };

    commit(ADD_NOTIFICATION, uniqueNotification);

    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
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
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
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
