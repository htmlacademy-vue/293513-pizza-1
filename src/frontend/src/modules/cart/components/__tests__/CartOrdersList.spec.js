import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartOrdersList from "@/modules/cart/components/CartOrdersList";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const ordersData = [
  {
    id: 1,
    name: "My pizza",
    dough: "light",
    size: "large",
    sauce: "tomato",
    ingredients: [
      {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
        value: "mushrooms",
        count: 2,
      },
    ],
    price: 1000,
    quantity: 2,
  },
  {
    id: 2,
    name: "My new pizza",
    dough: "light",
    size: "large",
    sauce: "tomato",
    ingredients: [
      {
        id: 2,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
        value: "cheddar",
        count: 2,
      },
    ],
    price: 1000,
    quantity: 2,
  },
];

const createOrders = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "cart",
    value: ordersData,
  });
};

describe("CartOrdersList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartOrdersList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createOrders(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Displays the correct order quantity", () => {
    const orders = wrapper.findAll("[data-test='cart-order-item']");
    expect(orders.length).toEqual(ordersData.length);
  });
});
