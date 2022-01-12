import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  address: {
    userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
    name: "Home",
    street: "Street",
    building: "5",
    flat: "123",
    comment: "Only",
  },
  number: 1,
};

describe("ProfileAddress", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        editAddress: jest.fn(),
        deleteAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Shows the form for editing the address when clicking on the button", async () => {
    const buttonEditAddress = wrapper.find("[data-test='button-edit-address']");
    await buttonEditAddress.trigger("click");
    const formEditAddress = wrapper.find("[data-test='edit-address-form']");
    expect(formEditAddress.exists()).toBeTruthy();
  });

  it("Render address flat if exist", () => {
    const addressFlat = wrapper.find("[data-test='address-flat']");
    expect(addressFlat.exists()).toBeTruthy();
  });

  it("No render address flat if not exist", () => {
    const data = {
      address: {
        userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
        name: "Home",
        street: "Street",
        building: "5",
      },
      number: 1,
    };
    createComponent({ localVue, store, propsData: data });
    const addressFlat = wrapper.find("[data-test='address-flat']");
    expect(addressFlat.exists()).toBeFalsy();
  });

  it("Render address comment if exist", () => {
    const addressComment = wrapper.find("[data-test='address-comment']");
    expect(addressComment.exists()).toBeTruthy();
  });

  it("No render address comment if not exist", () => {
    const data = {
      address: {
        userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
        name: "Home",
        street: "Street",
        building: "5",
      },
      number: 1,
    };
    createComponent({ localVue, store, propsData: data });
    const addressComment = wrapper.find("[data-test='address-comment']");
    expect(addressComment.exists()).toBeFalsy();
  });
});
