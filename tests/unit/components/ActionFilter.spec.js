import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ActionFilter from "@/components/ActionFilter.vue";
import movies from "@/stores/movies";

jest.mock("@/stores/movies");

const dropdownStub = `<div is-stub="dropdown" :count="count"><slot name="trigger" /><slot name="options" /></div>`;

const localVue = createLocalVue();
localVue.use(Vuex);

const routerMock = { push: jest.fn(), currentRoute: { query: { fake: true } } };

describe("ActionFilter.vue", () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({ modules: { movies } });
    wrapper = shallowMount(ActionFilter, {
      store,
      localVue,
      stubs: { dropdown: dropdownStub },
      mocks: { $router: routerMock }
    });
  });

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("range input updates rating filter", () => {
    const rangeInput = wrapper.find("range-input-stub");
    rangeInput.vm.$emit("input", 4);

    expect(movies.mutations.setFilter).toHaveBeenLastCalledWith(
      expect.anything(),
      {
        type: "rating",
        value: 4
      }
    );

    expect(routerMock.push).toHaveBeenLastCalledWith({
      query: {
        fake: true,
        ratingFilter: 4
      }
    });
  });

  it("genre clicks updates genre filter", () => {
    const option = wrapper.find(".filter__genre-option");
    option.trigger("click");

    expect(movies.mutations.setFilter).toHaveBeenCalled();
    expect(movies.mutations.setFilter.mock.calls[1][1]).toEqual({
      type: "genre",
      value: 0
    });

    expect(routerMock.push).toHaveBeenLastCalledWith({
      query: {
        fake: true,
        genreFilter: "1"
      }
    });
  });
});
