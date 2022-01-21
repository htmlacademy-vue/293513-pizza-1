import { shallowMount } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications";

describe("AppNotifications", () => {
  const mocks = {
    $store: {
      state: {
        notifications: [],
      },
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it("Doesn't render out when no notifications", () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it("Renders out when we have notifications", () => {
    mocks.$store.state.notifications = [
      {
        text: "test",
        type: "warning",
      },
    ];

    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Renders out notification", () => {
    mocks.$store.state.notifications = [
      {
        text: "test",
        type: "warning",
      },
    ];

    createComponent({ mocks });
    expect(wrapper.html()).toContain("notification warning");
    expect(wrapper.html()).toContain("test");
  });
});
