import { shallowMount } from "@vue/test-utils";
import AppLayoutWithSidebar from "@/layouts/AppLayoutWithSidebar";
import AppHeader from "@/layouts/AppHeader";

describe("AppLayoutWithSidebar", () => {
  let wrapper;
  const slots = {
    default: "content",
  };
  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutWithSidebar, options);
  };

  beforeEach(() => {
    createComponent({ stubs, slots });
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
