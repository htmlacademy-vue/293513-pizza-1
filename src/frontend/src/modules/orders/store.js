import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    orders: [],
    isLoading: false,
  },

  getters: {
    sumPricePizza: (state, getters, rootState) => (pizza) => {
      const builderState = rootState.Builder;

      const dough = builderState.doughList.find(
        (it) => it.id === pizza.doughId
      );

      const size = builderState.sizes.find((it) => it.id === pizza.sizeId);

      const sauce = builderState.sauces.find((it) => it.id === pizza.sauceId);

      const sumIngredients = pizza.ingredients.reduce((acc, item) => {
        const ingredient = builderState.ingredients.find(
          (it) => it.id === item.ingredientId
        );

        acc += ingredient.price * item.quantity;
        return acc;
      }, 0);

      return (dough.price + sauce.price + sumIngredients) * size.multiplier;
    },

    sumPriceMisc: (state, getters, rootState) => (misc) => {
      if (!misc) {
        return 0;
      }

      const cartState = rootState.Cart;

      return misc.reduce((acc, item) => {
        const miscItem = cartState.misc.find((it) => it.id === item.miscId);
        acc += miscItem.price * item.quantity;
        return acc;
      }, 0);
    },
  },

  actions: {
    async getOrders({ commit }) {
      const data = await this.$api.orders.query();

      commit(
        SET_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: data,
        },
        { root: true }
      );
    },

    async removeOrder({ state, commit }, order) {
      await this.$api.orders.delete(order);

      commit(
        SET_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: state.orders.filter((it) => it.id !== order.id),
        },
        { root: true }
      );
    },
  },
};
