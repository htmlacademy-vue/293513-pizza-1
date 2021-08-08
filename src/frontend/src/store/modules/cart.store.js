import { ADD_TO_CART } from "@/store/mutations-types";
import misc from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers";

export default {
  namespaced: true,

  state: {
    cart: [],
    misc: misc.map(normalizeMisc),
  },

  mutations: {
    [ADD_TO_CART](state, order) {
      state.cart.push(order);
    },
  },

  getters: {
    totalSum(state) {
      return state.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },

  actions: {
    [ADD_TO_CART]({ rootState, rootGetters, commit }) {
      commit(ADD_TO_CART, {
        name: rootState.Builder.namePizza,
        dough: rootState.Builder.dough,
        size: rootState.Builder.size,
        sauce: rootState.Builder.sauce,
        ingredients: rootGetters["Builder/selectedIngredients"],
        price: rootGetters["Builder/totalSum"],
        quantity: 1,
      });

      commit("Builder/RESET_BUILDER", null, { root: true });
    },
  },
};
