import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import OrderItemMisc from "@/modules/orders/components/OrderItemMisc";
import miscData from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  misc: { id: 2, quantity: 2, orderId: 1, miscId: 2 },
};

const misc = miscData.map(normalizeMisc);

const createMisc = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "misc",
      value: misc,
    },
    { root: true }
  );
};

describe("OrderItemMisc", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(OrderItemMisc, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createMisc(store);
    createComponent({ localVue, store, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("If the quantity is greater than 1, then the multiplier is shown", () => {
    const multiplier = wrapper.find("[data-test='misc-multiplier']");
    expect(multiplier.exists()).toBeTruthy();
  });
});
