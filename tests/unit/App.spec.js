import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App.vue", () => {
  describe("update sort", () => {
    jest.useFakeTimers();
    let wrapper;

    beforeAll(() => {
      const store = new Vuex.Store({
        actions: {
          initialFetch: () => new Promise(resolve => setTimeout(resolve, 100))
        }
      });
      wrapper = shallowMount(App, {
        store,
        localVue,
        stubs: { "router-view": true }
      });
    });

    it("renders", async () => {
      expect(wrapper).toMatchSnapshot();

      jest.runAllTimers();
      // Run promise callback
      await wrapper.vm.$nextTick();
      // Component render
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
