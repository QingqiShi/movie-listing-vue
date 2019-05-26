import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ActionSort from "@/components/ActionSort.vue";
import movies from "@/stores/movies";

jest.mock("@/stores/movies");

const localVue = createLocalVue();
localVue.use(Vuex);

const routerMock = { push: jest.fn(), currentRoute: { query: { fake: true } } };

describe("ActionSort.vue", () => {
  it.each`
    property          | order
    ${"popularity"}   | ${true}
    ${"popularity"}   | ${false}
    ${"vote_average"} | ${true}
    ${"vote_average"} | ${false}
  `("renders sort by $property order $order", ({ property, order }) => {
    movies.state.sortProperty = property;
    movies.state.sortOrder = order;
    const store = new Vuex.Store({ modules: { movies } });
    const wrapper = shallowMount(ActionSort, {
      store,
      localVue,
      mocks: { $router: routerMock }
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe("update sort", () => {
    let wrapper;
    const sortLinks = {};

    beforeAll(() => {
      const store = new Vuex.Store({ modules: { movies } });
      wrapper = shallowMount(ActionSort, {
        store,
        localVue,
        mocks: { $router: routerMock }
      });

      sortLinks.popularity = wrapper.find(".sort__link--popularity");
      sortLinks.rating = wrapper.find(".sort__link--vote_average");
    });

    it.each`
      startProperty     | startOrder | toClick         | expectedProperty  | expectedOrder
      ${"popularity"}   | ${false}   | ${"popularity"} | ${"popularity"}   | ${true}
      ${"popularity"}   | ${true}    | ${"rating"}     | ${"vote_average"} | ${false}
      ${"vote_average"} | ${false}   | ${"rating"}     | ${"vote_average"} | ${true}
      ${"vote_average"} | ${true}    | ${"popularity"} | ${"popularity"}   | ${false}
    `(
      "click on $toClick link (from $startProperty, $startOrder)",
      ({
        startProperty,
        startOrder,
        toClick,
        expectedProperty,
        expectedOrder
      }) => {
        movies.state.sortProperty = startProperty;
        movies.state.sortOrder = startOrder;

        sortLinks[toClick].trigger("click");
        expect(movies.mutations.setSort).toHaveBeenLastCalledWith(
          expect.anything(),
          {
            property: expectedProperty,
            order: expectedOrder
          }
        );

        expect(routerMock.push).toHaveBeenLastCalledWith({
          query: {
            fake: true,
            sortProperty: expectedProperty,
            sortOrder: expectedOrder
          }
        });
      }
    );
  });
});
