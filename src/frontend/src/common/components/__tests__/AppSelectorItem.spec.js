import { shallowMount } from "@vue/test-utils";
import AppSelectorItem from "@/common/components/AppSelectorItem";

describe("AppSelectorItem", () => {
  const slots = { default: "content" };
  let props;

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppSelectorItem, options);
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
