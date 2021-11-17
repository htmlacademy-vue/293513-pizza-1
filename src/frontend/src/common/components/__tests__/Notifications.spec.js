import { shallowMount } from "@vue/test-utils";
import Notifications from "@/common/components/Notifications";

describe("Notifications", () => {
  const mock = {
    $store: {
      state: {
        notifications: [],
      },
    },
  };

  let wrapper;
  // const createComponent = (options) => {
  //   wrapper = shallowMount(Notifications, options);
  // };
  //
  // afterEach(() => {
  //   wrapper.destroy();
  //   mock.$store.state.notifications = [];
  // });

  it("Doesn't render out when no notifications", () => {
    // createComponent({ mock });
    // expect(wrapper.html()).toBeFalsy();
  });
});
