import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import {
  CHANGE_COUNT_INGREDIENT,
  SET_DOUGH,
  SET_NAME_PIZZA,
  SET_SAUCE,
  SET_SIZE,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    ingredients: pizza.ingredients.map((ingredient) =>
      normalizeIngredient(ingredient)
    ),
    doughList: pizza.dough.map((dough) => normalizeDough(dough)),
    sizes: pizza.sizes.map((size) => normalizeSize(size)),
    sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
    namePizza: "",
    dough: "light",
    size: "small",
    sauce: "tomato",
  },

  mutations: {
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
