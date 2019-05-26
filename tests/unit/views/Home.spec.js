import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const fakeStore = {
  modules: {
    movies: {
      state: { error: "", sortOrder: false, sortProperty: "popularity" }
    }
  },
  mutations: {
    setSort: jest.fn(),
    setFilter: jest.fn()
  }
};

describe("Home.vue", () => {
  let store;
  let wrapper;

  beforeAll(() => {
    store = new Vuex.Store(fakeStore);
    wrapper = shallowMount(Home, { store, localVue });
  });

  it("renders no error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders error", () => {
    store.state.movies.error = "test error";
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't commit", () => {
    expect(fakeStore.mutations.setSort).not.toHaveBeenCalled();
    expect(fakeStore.mutations.setFilter).not.toHaveBeenCalled();
  });

  describe("sets up with url", () => {
    it.each`
      sortOrder    | sortProperty      | ratingFilter | genreFilter  | mutation       | payload
      ${true}      | ${"vote_average"} | ${undefined} | ${undefined} | ${"setSort"}   | ${{ property: "vote_average", order: true }}
      ${false}     | ${"vote_average"} | ${undefined} | ${undefined} | ${"setSort"}   | ${{ property: "vote_average", order: false }}
      ${true}      | ${"popularity"}   | ${undefined} | ${undefined} | ${"setSort"}   | ${{ property: "popularity", order: true }}
      ${undefined} | ${"vote_average"} | ${undefined} | ${undefined} | ${"setSort"}   | ${{ property: "vote_average", order: false }}
      ${true}      | ${undefined}      | ${undefined} | ${undefined} | ${"setSort"}   | ${{ property: "popularity", order: true }}
      ${undefined} | ${undefined}      | ${5}         | ${undefined} | ${"setFilter"} | ${{ type: "rating", value: 5 }}
      ${undefined} | ${undefined}      | ${undefined} | ${[0, 1]}    | ${"setFilter"} | ${{ type: "genre", value: 0 }}
      ${undefined} | ${undefined}      | ${undefined} | ${[0, 1]}    | ${"setFilter"} | ${{ type: "genre", value: 1 }}
    `(
      "set query ($sortOrder, $sortProperty, $ratingFilter, $genreFilter)",
      ({
        sortOrder,
        sortProperty,
        ratingFilter,
        genreFilter,
        mutation,
        payload
      }) => {
        jest.clearAllMocks();
        const query = { sortOrder, sortProperty, ratingFilter, genreFilter };
        wrapper = shallowMount(Home, { store, localVue, propsData: { query } });

        expect(fakeStore.mutations[mutation]).toHaveBeenCalledWith(
          expect.anything(),
          payload
        );
      }
    );
  });
});
