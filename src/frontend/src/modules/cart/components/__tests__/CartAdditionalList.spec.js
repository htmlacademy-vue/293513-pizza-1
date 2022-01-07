import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import miscData from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";

const localVue = createLocalVue();
localVue.use(Vuex);

const misc = miscData.map(normalizeMisc);

const createMisc = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc,
  });
};

describe("CartAdditionalList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, options);
  };

  beforeEach(() => {
    store = generateMockStore({});
    createMisc(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Component renders the passed number of misc", () => {
    const miscItems = wrapper.findAll("[data-test='cart-additional-item']");
    expect(miscItems).toHaveLength(misc.length);
  });
});
