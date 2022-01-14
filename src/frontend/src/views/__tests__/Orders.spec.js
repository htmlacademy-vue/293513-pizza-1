import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Orders from "@/views/Orders";
import OrderItem from "@/modules/orders/components/OrderItem";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const ordersData = [
  {
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
  {
    id: 2,
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
];

const createOrders = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Orders",
      entity: "orders",
      value: ordersData,
    },
    { root: true }
  );
};

describe("Orders", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
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

  it("Displays the correct orders quantity", async () => {
    await localVue.nextTick();
    const orders = wrapper.findAllComponents(OrderItem);
    expect(orders).toHaveLength(ordersData.length);
  });
});
