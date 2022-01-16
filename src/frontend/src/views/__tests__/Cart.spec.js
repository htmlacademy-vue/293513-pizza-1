import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Cart from "@/views/Cart";
import CartOrdersList from "@/modules/cart/components/CartOrdersList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
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

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        sendOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Render cart title if cart is empty", () => {
    const cartTitle = wrapper.find("[data-test='empty-cart-title']");
    expect(cartTitle.exists()).toBeTruthy();
  });

  it("Render cart list if cart is not empty", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    await localVue.nextTick();
    const cartList = wrapper.findComponent(CartOrdersList);
    expect(cartList.exists()).toBeTruthy();
  });

  it("Render additional list if cart is not empty", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    await localVue.nextTick();
    const cartAdditionalList = wrapper.findComponent(CartAdditionalList);
    expect(cartAdditionalList.exists()).toBeTruthy();
  });

  it("Render cart form if cart is not empty", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    await localVue.nextTick();
    const cartForm = wrapper.findComponent(CartForm);
    expect(cartForm.exists()).toBeTruthy();
  });

  it("Render cart footer if cart is not empty", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    await localVue.nextTick();
    const cartFooter = wrapper.findComponent(CartFooter);
    expect(cartFooter.exists()).toBeTruthy();
  });

  it("Calls sendOrder after submit form", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    const cartForm = wrapper.find("[data-test='cart-form']");
    await cartForm.trigger("submit", { preventDefault: () => {} });
    expect(actions.Cart.sendOrder).toHaveBeenCalled();
  });
});
