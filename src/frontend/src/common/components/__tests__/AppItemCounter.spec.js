import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const props = {
    value: 0,
    min: 0,
    max: 3,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it("The input must contain the passed initial value", () => {
    wrapper = shallowMount(AppItemCounter, { propsData: props });
    expect(Number(wrapper.find("input").element.value)).toBe(props.value);
  });

  it("The decrement button should be disabled when the value is 0", () => {
    wrapper = shallowMount(AppItemCounter, { propsData: props });
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(true);
  });

  it("The decrement button should be active when the value is more then 0", () => {
    wrapper = shallowMount(AppItemCounter, {
      propsData: { ...props, value: 2 },
    });
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(
      false
    );
  });

  it("The increment button should be active when the value is 0", () => {
    wrapper = shallowMount(AppItemCounter, { propsData: props });
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(false);
  });

  it(
    "The increment button should be disabled when the value is more then max" +
      " value",
    () => {
      wrapper = shallowMount(AppItemCounter, {
        propsData: { ...props, value: 3 },
      });
      expect(wrapper.find(".counter__button--plus").element.disabled).toBe(
        true
      );
    }
  );

  it("Click on the decrement button decreases the value of the input", async () => {
    wrapper = shallowMount(AppItemCounter, {
      propsData: { ...props, value: 3 },
    });
    const button = wrapper.find(".counter__button--minus");
    await button.trigger("click");
    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input")[0][0]).toBe(2);
  });

  it("Click on the increment button increases the value of the input", async () => {
    wrapper = shallowMount(AppItemCounter, {
      propsData: { ...props, value: 2 },
    });
    const button = wrapper.find(".counter__button--plus");
    await button.trigger("click");
    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input")[0][0]).toBe(3);
  });
});
