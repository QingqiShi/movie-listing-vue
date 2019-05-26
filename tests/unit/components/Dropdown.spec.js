import { shallowMount } from "@vue/test-utils";
import Dropdown from "@/components/Dropdown.vue";

const Trigger = '<div class="fakeTrigger"></div>';
const Options = "<div></div><div></div><div></div><div></div>";

describe("Dropdown.vue", () => {
  let wrapper;
  let trigger;

  beforeAll(() => {
    wrapper = shallowMount(Dropdown, {
      slots: { trigger: Trigger, options: Options }
    });
    trigger = wrapper.find(".dropdown__trigger");
  });

  it("initial renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("expand", () => {
    trigger.trigger("click");
    expect(wrapper).toMatchSnapshot();

    const dropdown = wrapper.find(".dropdown");
    expect(dropdown.classes("dropdown--expanded")).toBe(true);
  });

  it("collapse", () => {
    trigger.trigger("click");
    expect(wrapper).toMatchSnapshot();

    const dropdown = wrapper.find(".dropdown");
    expect(dropdown.classes("dropdown--collapsed")).toBe(true);
  });
});
