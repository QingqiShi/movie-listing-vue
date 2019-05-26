import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Movie from "@/components/Movie.vue";
import movies from "@/stores/movies";

jest.mock("@/stores/movies");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Movie.vue", () => {
  let wrapper;

  beforeAll(() => {
    const store = new Vuex.Store({ modules: { movies } });
    wrapper = shallowMount(Movie, {
      store,
      localVue,
      propsData: { movie: movies.state.movies[0] }
    });
  });

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("reverse badge based on sort property", () => {
    wrapper.vm.$store.state.movies.sortProperty = "vote_average";
    expect(wrapper).toMatchSnapshot();
  });
});
