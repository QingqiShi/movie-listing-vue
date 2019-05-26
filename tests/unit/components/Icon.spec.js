import { shallowMount } from "@vue/test-utils";
import Icon from "@/components/Icon.vue";

describe("Icon.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Icon, { propsData: { name: "test" } });
    expect(wrapper).toMatchSnapshot();
  });
});
