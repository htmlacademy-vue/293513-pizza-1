import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartForm from "@/modules/cart/components/CartForm";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const addresses = [
  {
    id: 1,
    name: "Адрес",
    street: "улица",
  },
  {
    id: 2,
    name: "Адрес 2",
    street: "улица 2",
  },
];

const createAddresses = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Addresses",
      entity: "addresses",
      value: addresses,
    },
    { root: true }
  );
};

describe("CartForm", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addAddress: jest.fn(),
        setPhone: jest.fn(),
        setAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createAddresses(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Displays the correct number of delivery select options", () => {
    const deliveryOptions = wrapper
      .find("[data-test='cart-delivery']")
      .findAll("option");
    expect(deliveryOptions.length).toEqual(addresses.length + 2);
  });

  it("Change phone number", async () => {
    const inputPhone = wrapper.find("[data-test='cart-phone']");
    await inputPhone.trigger("input");
    expect(actions.Cart.setPhone).toHaveBeenCalled();
  });

  it("Show new address form", async () => {
    const deliveryOptions = wrapper
      .find("[data-test='cart-delivery']")
      .findAll("option");
    await deliveryOptions.at(1).setSelected();
    const addressForm = wrapper.find("[data-test='cart-address-form']");
    expect(addressForm.exists()).toBeTruthy();
  });

  it("Added new address data", async () => {
    const deliveryOptions = wrapper
      .find("[data-test='cart-delivery']")
      .findAll("option");
    await deliveryOptions.at(1).setSelected();
    expect(actions.Cart.addAddress).toHaveBeenCalled();
    const inputStreet = wrapper.find("[data-test='cart-address-street']");
    const inputHouse = wrapper.find("[data-test='cart-address-house']");
    const inputFlat = wrapper.find("[data-test='cart-address-flat']");
    await inputStreet.trigger("input", { value: "Street" });
    await inputHouse.trigger("input", { value: "House" });
    await inputFlat.trigger("input", { value: "Flat" });
    expect(actions.Cart.setAddress).toHaveBeenCalledTimes(3);
  });
});
