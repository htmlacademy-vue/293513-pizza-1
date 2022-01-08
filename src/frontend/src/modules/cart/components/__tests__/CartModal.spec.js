import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartModal from "@/modules/cart/components/CartModal";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.useFakeTimers();

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("CartModal", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartModal, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        resetCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({
      localVue,
      store,
      propsData: { close: jest.fn() },
      mocks,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("If the user is not logged in, then redirect to the main page", async () => {
    const buttonReady = wrapper.find("[data-test='cart-ready']");
    buttonReady.trigger("click", { preventDefault: () => {} });
    jest.runAllTimers();
    expect(actions.Cart.resetCart).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("If the user is logged in, then redirect to the main page", async () => {
    const buttonReady = wrapper.find("[data-test='cart-ready']");
    store.commit(
      SET_ENTITY,
      {
        module: "Auth",
        entity: "isAuthenticated",
        value: true,
      },
      { root: true }
    );
    createComponent({
      localVue,
      store,
      propsData: { close: jest.fn() },
      mocks,
    });
    buttonReady.trigger("click", { preventDefault: () => {} });
    jest.runAllTimers();
    expect(actions.Cart.resetCart).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Orders" });
  });
});
