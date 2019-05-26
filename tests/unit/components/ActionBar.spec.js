import { shallowMount } from "@vue/test-utils";
import ActionBar from "@/components/ActionBar.vue";

describe("ActionBar.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(ActionBar);
    expect(wrapper).toMatchSnapshot();
  });
});
