import { shallowMount } from "@vue/test-utils";
import RangeInput from "@/components/RangeInput.vue";

describe("RangeInput.vue", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(RangeInput, {
      propsData: {
        min: 10,
        max: 20,
        step: 0.5,
        value: 15
      }
    });
  });

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("initial value", () => {
    expect(parseInt(wrapper.element.value)).toBe(10);
  });

  it("initial value", () => {
    wrapper.setValue(17);
    expect(wrapper.emitted().input[0]).toEqual([18.5]);
  });
});
