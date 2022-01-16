import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import OrderItem from "@/modules/orders/components/OrderItem";
import pizza from "@/static/pizza.json";
import miscData from "@/static/misc.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeMisc,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

const propsData = {
  order: {
    id: 1,
    phone: "123456789",
    userId: "6629caa5-9714-4c19-8670-cde9f94b7d22",
    addressId: 1,
    orderPizzas: [
      {
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
    ],
    orderMisc: [
      { id: 1, quantity: 1, orderId: 1, miscId: 1 },
      { id: 2, quantity: 1, orderId: 1, miscId: 2 },
      { id: 3, quantity: 1, orderId: 1, miscId: 3 },
    ],
    orderAddress: {
      id: 1,
      name: "ул.Street, д.5, кв.123",
      street: "Street",
      building: "5",
      flat: "123",
      comment: null,
      userId: "6629caa5-9714-4c19-8670-cde9f94b7d22",
    },
  },
};

const dough = pizza.dough.map(normalizeDough);
const sauces = pizza.sauces.map(normalizeSauce);
const sizes = pizza.sizes.map(normalizeSize);
const ingredients = pizza.ingredients.map(normalizeIngredient);
const misc = miscData.map(normalizeMisc);

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

const createMisc = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "misc",
      value: misc,
    },
    { root: true }
  );
};

describe("OrderItem", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        removeOrder: jest.fn(),
      },
      Cart: {
        repeatOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createDough(store);
    createSauces(store);
    createSizes(store);
    createIngredients(store);
    createMisc(store);
    createComponent({ localVue, store, propsData, mocks });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Calls remove order", async () => {
    const buttonRemoveOrder = wrapper.find("[data-test='button-remove-order']");
    await buttonRemoveOrder.trigger("click");
    expect(actions.Orders.removeOrder).toHaveBeenCalled();
  });

  it("Calls repeat order", async () => {
    const buttonRepeatOrder = wrapper.find("[data-test='button-repeat-order']");
    await buttonRepeatOrder.trigger("click");
    expect(actions.Cart.repeatOrder).toHaveBeenCalled();
  });

  it("When you repeat the order, redirects to the cart", async () => {
    const buttonRepeatOrder = wrapper.find("[data-test='button-repeat-order']");
    await buttonRepeatOrder.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Cart" });
  });
});
