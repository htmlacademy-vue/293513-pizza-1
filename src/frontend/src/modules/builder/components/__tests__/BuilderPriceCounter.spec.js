import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import { ADD_TO_CART, SET_ENTITY } from "@/store/mutations-types";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { generateMockStore } from "@/store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        ADD_TO_CART: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createDough(store);
    createSauces(store);
    createSizes(store);
    createIngredients(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Initial total sum is displayed correctly", () => {
    const totalSum = wrapper.find("[data-test='builder-total-sum']");
    const sum = store.getters["Builder/totalSum"];
    expect(totalSum.text()).toContain(sum);
  });

  it("The button is disabled if no pizza name or ingredients are not selected", () => {
    store.commit(
      SET_ENTITY,
      {
        module: "Builder",
        entity: "namePizza",
        value: "",
      },
      { root: true }
    );
    createComponent({ localVue, store });
    const button = wrapper.find("[data-test='builder-button-ready']");
    expect(button.attributes().disabled).toEqual("disabled");
  });

  it("The button is enable if a pizza name is entered and ingredient is selected", () => {
    ingredients[0].count = 2;
    store.commit(
      SET_ENTITY,
      {
        module: "Builder",
        entity: "ingredients",
        value: ingredients,
      },
      { root: true }
    );

    store.commit(
      SET_ENTITY,
      {
        module: "Builder",
        entity: "namePizza",
        value: "My pizza",
      },
      { root: true }
    );
    createComponent({ localVue, store });
    const button = wrapper.find("[data-test='builder-button-ready']");
    expect(button.attributes().disabled).toBeFalsy();
  });

  it("Calls the button click", async () => {
    ingredients[0].count = 2;
    store.commit(
      SET_ENTITY,
      {
        module: "Builder",
        entity: "ingredients",
        value: ingredients,
      },
      { root: true }
    );

    store.commit(
      SET_ENTITY,
      {
        module: "Builder",
        entity: "namePizza",
        value: "My pizza",
      },
      { root: true }
    );
    createComponent({ localVue, store });
    const button = wrapper.find("[data-test='builder-button-ready']");
    await button.trigger("click");
    expect(actions.Cart[ADD_TO_CART]).toHaveBeenCalled();
  });
});
