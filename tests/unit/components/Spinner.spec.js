import { shallowMount } from "@vue/test-utils";
import Spinner from "@/components/Spinner.vue";

describe("Spinner.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper).toMatchSnapshot();
  });
});
