import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const slots = { default: "content" };
  let props;

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    props = {
      name: "test",
      value: "test",
      checked: false,
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots, propsData: props });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Raises the change event on change", async () => {
    createComponent({ slots, propsData: props });
    const input = wrapper.find("input");
    await input.trigger("change");
    expect(wrapper.emitted("change")).toBeTruthy();
  });
});
