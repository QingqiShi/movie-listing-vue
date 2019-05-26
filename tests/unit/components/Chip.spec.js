import { shallowMount } from "@vue/test-utils";
import Chip from "@/components/Chip.vue";

describe("Chip.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Chip, { slots: { default: "test" } });
    expect(wrapper).toMatchSnapshot();
  });
});
