import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Profile from "@/views/Profile";
import { SET_ENTITY } from "@/store/mutations-types";
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileForm from "@/modules/profile/components/ProfileForm";

const localVue = createLocalVue();
localVue.use(Vuex);

const addressData = [
  {
    userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
    name: "Home",
    street: "Street",
    building: "5",
    flat: "123",
    comment: "Only",
  },
  {
    userId: "51cbb350-e828-4cf6-bae0-7ec5f970f7f2",
    name: "Home",
    street: "Street",
    building: "5",
    flat: "123",
    comment: "Only",
  },
];

const createAddresses = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Addresses",
      entity: "addresses",
      value: addressData,
    },
    { root: true }
  );
};

describe("Profile", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createAddresses(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Should render profile user", () => {
    const profileUser = wrapper.findComponent(ProfileUser);
    expect(profileUser.exists()).toBeTruthy();
  });

  it("Should render address list if exists", async () => {
    const profileAddresses = await wrapper.findAllComponents(ProfileAddress);
    expect(profileAddresses.exists()).toBeTruthy();
    expect(profileAddresses).toHaveLength(addressData.length);
  });

  it("Should show profile form when the button add new address id clicked", async () => {
    const button = wrapper.find("[data-test='button-new-address']");
    await button.trigger("click");
    const profileForm = wrapper.findComponent(ProfileForm);
    expect(profileForm.exists()).toBeTruthy();
  });
});
