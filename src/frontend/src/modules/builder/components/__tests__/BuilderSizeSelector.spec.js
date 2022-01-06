import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import pizza from "@/static/pizza.json";
import { normalizeSize } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

const sizes = pizza.sizes.map(normalizeSize);

const createSizes = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizes,
    },
    { root: true }
  );
};

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setSize: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createSizes(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Change pizza size", async () => {
    const changeSizeButton = wrapper.find("[data-test='builder-size-pizza']");
    await changeSizeButton.vm.$emit("change", sizes[1].value);
    expect(actions.Builder.setSize).toHaveBeenLastCalledWith(
      expect.any(Object),
      sizes[1].value
    );
  });
});
