import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileUser from "@/modules/profile/components/ProfileUser";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileUser", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileUser, options);
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
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
