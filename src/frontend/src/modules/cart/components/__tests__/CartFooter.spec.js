import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartFooter from "@/modules/cart/components/CartFooter";

const localVue = createLocalVue();
localVue.use(Vuex);
const stubs = ["router-link"];

describe("CartFooter", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    store = generateMockStore({});
    createComponent({ localVue, store, stubs });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
