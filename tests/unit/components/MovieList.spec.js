import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MovieList from "@/components/MovieList.vue";
import movies from "@/stores/movies";

jest.mock("@/stores/movies");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("MovieList.vue", () => {
  it("renders", () => {
    const store = new Vuex.Store({ modules: { movies } });
    const wrapper = shallowMount(MovieList, { store, localVue });
    expect(wrapper).toMatchSnapshot();
  });
});
