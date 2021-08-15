import {
  ADD_TO_CART,
  DECREMENT_MISC,
  DECREMENT_ORDER,
  INCREMENT_MISC,
  INCREMENT_ORDER,
  REMOVE_ORDER,
  RESET_CART,
} from "@/store/mutations-types";
import misc from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers";

const defaultState = () => ({
  cart: [],
  misc: misc.map(normalizeMisc),
});

export default {
  namespaced: true,

  state: defaultState(),

  mutations: {
    [ADD_TO_CART](state, order) {
      state.cart.push(order);
    },

    [REMOVE_ORDER](state, order) {
      state.cart = state.cart.filter((it) => it.id !== order.id);
    },

    [INCREMENT_ORDER](state, order) {
      const el = state.cart.find((it) => it.id === order.id);
      el.quantity += 1;
    },

    [DECREMENT_ORDER](state, order) {
      const el = state.cart.find((it) => it.id === order.id);
      el.quantity -= 1;
    },

    [INCREMENT_MISC](state, misc) {
      const el = state.misc.find((it) => it.id === misc.id);
      el.quantity += 1;
    },

    [DECREMENT_MISC](state, misc) {
      const el = state.misc.find((it) => it.id === misc.id);
      if (el.quantity !== 0) {
        el.quantity -= 1;
      }
    },

    [RESET_CART](state) {
      Object.assign(state, defaultState());
    },
  },

  getters: {
    totalSum(state) {
      const sumPizza = state.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      const sumMisc = state.misc.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return sumPizza + sumMisc;
    },
  },

  actions: {
    [ADD_TO_CART]({ rootState, rootGetters, commit, dispatch }) {
      commit(ADD_TO_CART, {
        id: Date.now(),
        name: rootState.Builder.namePizza,
        dough: rootState.Builder.dough,
        size: rootState.Builder.size,
        sauce: rootState.Builder.sauce,
        ingredients: rootGetters["Builder/selectedIngredients"],
        price: rootGetters["Builder/totalSum"],
        quantity: 1,
      });

      commit("Builder/RESET_BUILDER", null, { root: true });
      dispatch("Builder/query", null, { root: true });
    },

    [DECREMENT_ORDER]({ commit }, order) {
      if (order.quantity === 1) {
        commit(REMOVE_ORDER, order);
      } else {
        commit(DECREMENT_ORDER, order);
      }
    },
  },
};
