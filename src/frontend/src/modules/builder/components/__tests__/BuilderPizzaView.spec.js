import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
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

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setNamePizza: jest.fn(),
        changeCountIngredient: jest.fn(),
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

  it("Change pizza name", async () => {
    const input = wrapper.find("[data-test='builder-input-name']");
    await input.trigger("input");
    expect(actions.Builder.setNamePizza).toHaveBeenCalled();
  });

  it("Set pizza view class", () => {
    const pizzaView = wrapper.find("[data-test='builder-pizza-view']");
    expect(pizzaView.classes()).toContain("pizza--foundation--small-tomato");
  });

  it("Change ingredient count on drop event", async () => {
    const ingredient = ingredients[0];
    const appDropElement = wrapper.findComponent({ name: "AppDrop" });
    await appDropElement.vm.$emit("drop", ingredient);
    expect(actions.Builder.changeCountIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      { value: ingredient.value, count: ingredient.count + 1 }
    );
  });
});
