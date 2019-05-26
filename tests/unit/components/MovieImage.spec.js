import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MovieImage from "@/components/MovieImage.vue";
import movies from "@/stores/movies";

jest.mock("@/stores/movies");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("MovieImage.vue", () => {
  let store;

  beforeAll(() => {
    store = new Vuex.Store({ modules: { movies } });
  });

  it("renders", () => {
    const wrapper = shallowMount(MovieImage, {
      store,
      localVue,
      propsData: { src: "/test.jpg", type: "poster", targetWidth: 300 }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("invalid type", () => {
    const wrapper = shallowMount(MovieImage, {
      store,
      localVue,
      propsData: { src: "/test.jpg", type: "invalid", targetWidth: 300 }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
