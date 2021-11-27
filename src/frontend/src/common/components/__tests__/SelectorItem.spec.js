import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  const slots = { default: "content" };
  let props;

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  beforeEach(() => {
    props = {
      value: "test",
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots, propsData: props });
    expect(wrapper.html()).toContain(slots.default);
  });
});
