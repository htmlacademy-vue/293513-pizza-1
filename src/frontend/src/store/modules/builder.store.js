import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import {
  CHANGE_BUILDER,
  CHANGE_COUNT_INGREDIENT,
  RESET_BUILDER,
  SET_DOUGH,
  SET_NAME_PIZZA,
  SET_SAUCE,
  SET_SIZE,
  SET_STATE_BUILDER,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    ingredients: [],
    doughList: [],
    sizes: [],
    sauces: [],
    namePizza: "",
    dough: "light",
    size: "small",
    sauce: "tomato",
  },

  actions: {
    async query({ commit }) {
      const [dough, ingredients, sauces, sizes] = await Promise.all([
        this.$api.dough.query(),
        this.$api.ingredients.query(),
        this.$api.sauces.query(),
        this.$api.sizes.query(),
      ]);

      commit(SET_STATE_BUILDER, {
        doughList: dough.map(normalizeDough),
        ingredients: ingredients.map(normalizeIngredient),
        sizes: sizes.map(normalizeSize),
        sauces: sauces.map(normalizeSauce),
      });
    },

    setDough({ commit }, value) {
      commit(SET_DOUGH, value);
    },

    setSauce({ commit }, value) {
      commit(SET_SAUCE, value);
    },

    changeCountIngredient({ commit }, value) {
      commit(CHANGE_COUNT_INGREDIENT, value);
    },

    setNamePizza({ commit }, value) {
      commit(SET_NAME_PIZZA, value);
    },
  },

  mutations: {
    [SET_STATE_BUILDER](state, value) {
      Object.assign(state, value);
    },

    [SET_NAME_PIZZA](state, value) {
      state.namePizza = value;
    },

    [SET_DOUGH](state, value) {
      state.dough = value;
    },

    [SET_SIZE](state, value) {
      state.size = value;
    },

    [SET_SAUCE](state, value) {
      state.sauce = value;
    },

    [CHANGE_COUNT_INGREDIENT](state, { value, count }) {
      const ingredient = state.ingredients.find((it) => it.value === value);
      ingredient.count = count;
    },

    [RESET_BUILDER](state) {
      state.namePizza = "";
      state.dough = "light";
      state.size = "small";
      state.sauce = "tomato";
    },

    [CHANGE_BUILDER](state, order) {
      state.namePizza = order.name;
      state.dough = order.dough;
      state.size = order.size;
      state.sauce = order.sauce;
      state.ingredients = state.ingredients.map((it) => {
        const ingredient = order.ingredients.find(
          (item) => item.value === it.value
        );
        return ingredient ? ingredient : it;
      });
    },
  },

  getters: {
    selectedIngredients(state) {
      return state.ingredients.filter((it) => it.count > 0);
    },

    totalSum(state, getters) {
      const dough = state.doughList.find((it) => it.value === state.dough);
      const sauce = state.sauces.find((it) => it.value === state.sauce);
      const size = state.sizes.find((it) => it.value === state.size);
      const sumIngredients = getters.selectedIngredients.reduce((acc, it) => {
        acc += it.count * it.price;
        return acc;
      }, 0);

      return (dough.price + sauce.price + sumIngredients) * size.multiplier;
    },

    isDisableCook(state, getters) {
      return !(getters.selectedIngredients.length && state.namePizza);
    },
  },
};
