import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import { SET_ENTITY } from "@/store/mutations-types";
import pizza from "@/static/pizza.json";
import { normalizeIngredient, normalizeSauce } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const sauces = pizza.sauces.map(normalizeSauce);

const ingredients = pizza.ingredients.map(normalizeIngredient);

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

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setSauce: jest.fn(),
        changeCountIngredient: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createSauces(store);
    createIngredients(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Change sauces", async () => {
    const radioButton = wrapper.find("[data-test='sauces-radio-button']");
    await radioButton.vm.$emit("change", sauces[0].value);
    expect(actions.Builder.setSauce).toHaveBeenLastCalledWith(
      expect.any(Object),
      sauces[0].value
    );
  });

  it("Increment ingredient value", async () => {
    const ingredientCounter = wrapper.find("[data-test='ingredient-counter']");
    await ingredientCounter.vm.$emit("input", ingredients[0].count + 1);
    expect(actions.Builder.changeCountIngredient).toHaveBeenLastCalledWith(
      expect.any(Object),
      { value: ingredients[0].value, count: ingredients[0].count + 1 }
    );
  });

  it("Decrement ingredient value", async () => {
    const ingredientCounter = wrapper.find("[data-test='ingredient-counter']");
    await ingredientCounter.vm.$emit("input", ingredients[0].count - 1);
    expect(actions.Builder.changeCountIngredient).toHaveBeenLastCalledWith(
      expect.any(Object),
      { value: ingredients[0].value, count: ingredients[0].count - 1 }
    );
  });
});
