import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mock";
import CartAdditionalItem from "@/modules/cart/components/CartAdditionalItem";

describe("CartAdditionalItem", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        increment: jest.fn(),
        decrement: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    const propsData = {
      additional: {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quantity: 0,
      },
    };
    createComponent({ propsData, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("If quantity equal 0 then button decrement is disabled", async () => {
    const propsData = {
      additional: {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quantity: 0,
      },
    };
    createComponent({ propsData, store });
    const button = wrapper.find("[data-test='button-additional-decrement']");
    expect(button.attributes().disabled).toEqual("disabled");
  });

  it("Calls decrement action", async () => {
    const propsData = {
      additional: {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quantity: 2,
      },
    };
    createComponent({ propsData, store });
    const button = wrapper.find("[data-test='button-additional-decrement']");
    await button.trigger("click");
    expect(actions.Cart.decrement).toHaveBeenCalled();
  });

  it("Calls increment action", async () => {
    const propsData = {
      additional: {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quantity: 0,
      },
    };
    createComponent({ propsData, store });
    const button = wrapper.find("[data-test='button-additional-increment']");
    await button.trigger("click");
    expect(actions.Cart.increment).toHaveBeenCalled();
  });
});
