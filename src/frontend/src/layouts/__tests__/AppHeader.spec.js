import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import AppHeader from "@/layouts/AppHeader";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);
const stubs = ["router-link"];

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $notifier: {
    success: jest.fn(),
  },
};

const createUser = (store) => {
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

  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    },
    { root: true }
  );
};

describe("AppHeader", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store, mocks, stubs });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Should render button login if no auth user", () => {
    const buttonLogin = wrapper.find("[data-test='login']");
    expect(buttonLogin.exists()).toBeTruthy();
  });

  it("Should not render button login if auth user", () => {
    createUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const buttonLogin = wrapper.find("[data-test='login']");
    expect(buttonLogin.exists()).toBeFalsy();
  });

  it("Should render button logout if auth user", () => {
    createUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const buttonLogout = wrapper.find("[data-test='logout']");
    expect(buttonLogout.exists()).toBeTruthy();
  });

  it("Calls logout when click button logout", async () => {
    createUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const buttonLogout = wrapper.find("[data-test='logout']");
    await buttonLogout.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
  });
});
