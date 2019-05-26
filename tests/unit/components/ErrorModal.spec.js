import { shallowMount } from "@vue/test-utils";
import ErrorModal from "@/components/ErrorModal.vue";

describe("ErrorModal.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(ErrorModal, {
      slots: { default: "<div>test</div>" }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
