import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import OrderItemPizza from "@/modules/orders/components/OrderItemPizza";
import { SET_ENTITY } from "@/store/mutations-types";
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  pizza: {
    id: 1,
    name: "My pizza",
    quantity: 2,
    sauceId: 1,
    doughId: 1,
    sizeId: 3,
    orderId: 1,
    ingredients: [
      { id: 1, quantity: 1, pizzaId: 1, ingredientId: 3 },
      { id: 2, quantity: 1, pizzaId: 1, ingredientId: 7 },
      { id: 3, quantity: 1, pizzaId: 1, ingredientId: 13 },
    ],
  },
};

const dough = pizza.dough.map(normalizeDough);
const sauces = pizza.sauces.map(normalizeSauce);
const sizes = pizza.sizes.map(normalizeSize);
const ingredients = pizza.ingredients.map(normalizeIngredient);

const createDough = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "doughList",
      value: dough,
    },
    { root: true }
  );
};

const createSauces = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: sauces,
    },
    { root: true }
  );
};

const createSizes = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizes,
    },
    { root: true }
  );
};

const createIngredients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredients,
    },
    { root: true }
  );
};

describe("OrderItemPizza", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(OrderItemPizza, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createDough(store);
    createSauces(store);
    createSizes(store);
    createIngredients(store);
    createComponent({ localVue, store, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("If the quantity is greater than 1, then the multiplier is shown", () => {
    const multiplier = wrapper.find("[data-test='pizza-multiplier']");
    expect(multiplier.exists()).toBeTruthy();
  });
});
