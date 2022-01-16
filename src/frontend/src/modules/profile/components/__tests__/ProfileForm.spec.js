import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  address: {
    id: 1,
    userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
    name: "Home",
    street: "Street",
    building: "5",
    flat: "123",
    comment: "Only",
  },
  number: 1,
};

describe("ProfileForm", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit(
      SET_ENTITY,
      {
        module: "Auth",
        entity: "user",
        value: {
          avatar: "/public/img/users/user.jpg",
          email: "user@example.com",
          id: "e556281d-e038-46a9-af6b-3c91a8b622f7",
          name: "Вася Пупкин",
          phone: "+777 777 777",
        },
      },
      { root: true }
    );
    createComponent({ localVue, store, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Calls addAddress to submit form", async () => {
    const formAddAddress = wrapper.find("[data-test='add-address']");
    await formAddAddress.trigger("submit", { preventDefault: () => {} });
    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  it("Calls removeAddress", async () => {
    const buttonRemoveAddress = wrapper.find(
      "[data-test='button-remove-address']"
    );
    await buttonRemoveAddress.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
