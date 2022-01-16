import { shallowMount } from "@vue/test-utils";
import Index from "../Index";

describe("Index", () => {
  it("Component is rendered", () => {
    const component = shallowMount(Index);
    expect(component.exists()).toBeTruthy();
  });
});
