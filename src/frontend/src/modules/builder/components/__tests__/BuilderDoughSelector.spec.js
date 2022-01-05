import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import pizza from "@/static/pizza.json";
import { normalizeDough } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough.map(normalizeDough);

const createDough = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "doughList",
      value: dough,
    },
    { root: true }
  );
};

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setDough: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createDough(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Change dough", async () => {
    createDough(store);
    createComponent({ localVue, store });
    const radioButton = wrapper.find("[data-test='dough-radio-button']");
    await radioButton.vm.$emit("change", dough[0].value);
    expect(actions.Builder.setDough).toHaveBeenCalledWith(
      expect.any(Object),
      dough[0].value
    );
  });
});
