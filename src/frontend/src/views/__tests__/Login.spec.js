import { mount } from "@vue/test-utils";
import Login from "@/views/Login";

const mocks = {
  $router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  $store: {
    dispatch: jest.fn(),
  },
};

describe("Login", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    mocks.$router.back = jest.fn();
    mocks.$store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Redirects to back on close button click", async () => {
    createComponent({ mocks });
    const btnClose = wrapper.find('[data-test="btn-close"]');
    await btnClose.trigger("click");
    expect(mocks.$router.back).toHaveBeenCalled();
  });

  it("Submits the form and redirects to the home page if the credentials are valid", async () => {
    createComponent({ mocks });
    const email = wrapper.find('[data-test="input-email"]');
    const password = wrapper.find('[data-test="input-password"]');

    email.element.value = "user@example.com";
    await email.trigger("input");

    password.element.value = "user@example.com";
    await password.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(mocks.$store.dispatch).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
