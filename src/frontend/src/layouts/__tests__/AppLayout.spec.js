import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";

describe("AppLayout", () => {
  let wrapper;

  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  beforeEach(() => {
    createComponent({ mocks });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("Should render slot content", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
