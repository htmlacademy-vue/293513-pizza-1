import { shallowMount } from "@vue/test-utils";
import Index from "@/views";

describe("Index", () => {
  it("Component is rendered", () => {
    const component = shallowMount(Index);
    expect(component.exists()).toBeTruthy();
  });
});
