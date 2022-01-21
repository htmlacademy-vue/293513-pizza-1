import {
  ADD_TO_CART,
  DECREMENT_MISC,
  DECREMENT_ORDER,
  INCREMENT_MISC,
  INCREMENT_ORDER,
  REMOVE_ORDER,
  REPEAT_ORDER,
  RESET_CART,
  SET_ADDRESS,
  SET_ENTITY,
  SET_PHONE,
} from "@/store/mutations-types";
import { normalizeMisc } from "@/common/helpers";

const defaultState = () => ({
  cart: [],
  misc: [],
  phone: "",
  address: null,
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

    [SET_PHONE](state, phone) {
      state.phone = phone;
    },

    [SET_ADDRESS](state, { field, value }) {
      state.address[field] = value;
    },

    [RESET_CART](state) {
      Object.assign(state, defaultState());
    },

    [REPEAT_ORDER](state, order) {
      state.cart = order.cart;
      state.misc = order.misc;
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
    async getMisc({ commit }) {
      const misc = await this.$api.misc.query();

      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "misc",
          value: misc.map(normalizeMisc),
        },
        { root: true }
      );
    },

    repeatOrder({ commit }, value) {
      commit(REPEAT_ORDER, value);
    },

    decrement({ commit }, value) {
      commit(DECREMENT_MISC, value);
    },

    increment({ commit }, value) {
      commit(INCREMENT_MISC, value);
    },

    setPhone({ commit }, value) {
      commit(SET_PHONE, value);
    },

    setAddress({ commit }, value) {
      commit(SET_ADDRESS, value);
    },

    async resetCart({ commit, dispatch }) {
      commit(RESET_CART);
      dispatch("getMisc");
    },

    removeOrder({ commit }, value) {
      commit(REMOVE_ORDER, value);
    },

    incrementOrder({ commit }, value) {
      commit(INCREMENT_ORDER, value);
    },

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

    decrementOrder({ commit }, order) {
      if (order.quantity === 1) {
        commit(REMOVE_ORDER, order);
      } else {
        commit(DECREMENT_ORDER, order);
      }
    },

    addAddress({ commit }, address) {
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "address",
          value: address,
        },
        { root: true }
      );
    },

    async sendOrder({ state, rootState }) {
      const pizzas = state.cart.map((item) => ({
        name: item.name,
        sauceId: rootState.Builder.sauces.find((it) => it.value === item.sauce)
          .id,
        doughId: rootState.Builder.doughList.find(
          (it) => it.value === item.dough
        ).id,
        sizeId: rootState.Builder.sizes.find((it) => it.value === item.size).id,
        quantity: item.quantity,
        ingredients: item.ingredients.map((it) => ({
          ingredientId: it.id,
          quantity: it.count,
        })),
      }));

      const misc = state.misc.reduce((acc, item) => {
        if (item.quantity > 0) {
          return [
            ...acc,
            {
              miscId: item.id,
              quantity: item.quantity,
            },
          ];
        }

        return acc;
      }, []);

      const order = {
        userId: rootState.Auth.user?.id ?? null,
        phone: state.phone,
        address: state.address,
        pizzas,
        misc,
      };

      await this.$api.orders.post(order);
    },
  },
};
