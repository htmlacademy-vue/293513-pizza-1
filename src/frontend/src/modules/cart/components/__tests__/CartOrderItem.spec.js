import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartOrderItem from "@/modules/cart/components/CartOrderItem";

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
};

describe("CartOrderItem", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartOrderItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        removeOrder: jest.fn(),
        incrementOrder: jest.fn(),
        decrementOrder: jest.fn(),
      },
      Builder: {
        changeBuilder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store, propsData, mocks });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Calls decrement order", async () => {
    const buttonDecrementOrder = wrapper.find(
      "[data-test='cart-decrement-order']"
    );
    await buttonDecrementOrder.trigger("click");
    expect(actions.Cart.decrementOrder).toHaveBeenCalled();
  });

  it("Calls increment order", async () => {
    const buttonIncrementOrder = wrapper.find(
      "[data-test='cart-increment-order']"
    );
    await buttonIncrementOrder.trigger("click");
    expect(actions.Cart.incrementOrder).toHaveBeenCalled();
  });

  it("Calls change order", async () => {
    const buttonChangeOrder = wrapper.find("[data-test='cart-change-order']");
    await buttonChangeOrder.trigger("click");
    expect(actions.Builder.changeBuilder).toHaveBeenCalled();
    expect(actions.Cart.removeOrder).toHaveBeenCalled();
  });

  it("When the order is changed, it is redirected to the main page", async () => {
    const buttonChangeOrder = wrapper.find("[data-test='cart-change-order']");
    await buttonChangeOrder.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
