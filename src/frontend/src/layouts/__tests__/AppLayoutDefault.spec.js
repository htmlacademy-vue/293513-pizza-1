import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";
import AppHeader from "@/layouts/AppHeader";

describe("AppDefaultLayout", () => {
  let wrapper;
  const slots = {
    default: "content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  beforeEach(() => {
    createComponent({ slots });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Should render slot content", () => {
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Should render app-header", () => {
    const header = wrapper.findComponent(AppHeader);
    expect(header.exists()).toBeTruthy();
  });
});
