import movies from "@/stores/movies";
import api from "@/constants/api";

const { getters, mutations, actions } = movies;

jest.mock("@/constants/api", () => ({
  CONFIGURATION: jest.fn(() => "fetchConfiguration"),
  NOW_PLAYING: jest.fn(() => "fetchMovies"),
  GENRES_LIST: jest.fn(() => "fetchGenres")
}));

describe("movies store", () => {
  describe("getters ratingFilteredMovies", () => {
    it("returns movies above rating", () => {
      const fakeState = {
        movies: [{ vote_average: 4 }, { vote_average: 5 }, { vote_average: 6 }],
        filterRating: 5
      };
      expect(getters.ratingFilteredMovies(fakeState)).toEqual([
        { vote_average: 5 },
        { vote_average: 6 }
      ]);
    });
  });

  describe("getters availableGenres", () => {
    const fakeState = {
      genres: [{ id: 0, name: "A" }, { id: 1, name: "B" }],
      filterGenres: { 0: false, 1: false }
    };
    const fakeGetters = {
      ratingFilteredMovies: [{ genre_ids: [1] }]
    };

    it("returns only genres in ratingFilteredMovies", () => {
      expect(getters.availableGenres(fakeState, fakeGetters)).toEqual([
        { id: 1, name: "B" }
      ]);
    });

    it("returns also the genres already selected as filter", () => {
      fakeState.filterGenres[0] = true;
      expect(getters.availableGenres(fakeState, fakeGetters)).toEqual([
        { id: 0, name: "A" },
        { id: 1, name: "B" }
      ]);
    });
  });

  describe("getters filteredMovies", () => {
    const fakeState = {
      filterGenres: { 0: false, 1: false }
    };
    const fakeGetters = {
      ratingFilteredMovies: [
        { vote_average: 5, genre_ids: [0] },
        { vote_average: 6, genre_ids: [0, 1] },
        { vote_average: 7, genre_ids: [1] }
      ],
      availableGenres: [{ id: 0, name: "A" }, { id: 1, name: "B" }]
    };

    it("returns ratingFilteredMovies when no genre filter", () => {
      const movies = getters.filteredMovies(fakeState, fakeGetters);
      expect(movies).toEqual(fakeGetters.ratingFilteredMovies);
    });

    it("returns movies filtered by genres", () => {
      fakeState.filterGenres[0] = true;
      fakeState.filterGenres[1] = true;
      const movies = getters.filteredMovies(fakeState, fakeGetters);
      expect(movies).toEqual([{ vote_average: 6, genre_ids: [0, 1] }]);
    });
  });

  describe("mutations setConfiguration", () => {
    it("sets configuration", () => {
      const fakeState = {};
      const fakePayload = {
        imageBaseUrl: "testUrl",
        posterSizes: ["w100", "w200"],
        backdropSizes: ["w400"]
      };

      mutations.setConfiguration(fakeState, fakePayload);
      expect(fakeState.configuration).toEqual(fakePayload);
    });
  });

  describe("mutations setMovies", () => {
    it("sets movies", () => {
      const fakeState = {};
      const fakePayload = [{ test: true }, { fake: false }];

      mutations.setMovies(fakeState, fakePayload);
      expect(fakeState.movies).toEqual(fakePayload);
    });
  });

  describe("mutations setGenres", () => {
    const fakeState = {};
    const fakePayload = [{ id: 0, test: true }, { id: 1, fake: false }];

    beforeAll(() => {
      mutations.setGenres(fakeState, fakePayload);
    });

    it("sets genres", () => {
      expect(fakeState.genres).toEqual(fakePayload);
    });

    it("sets filterGenres", () => {
      expect(fakeState.filterGenres).toEqual({ 0: false, 1: false });
    });
  });

  describe("mutations setOrder", () => {
    const fakeMovieA = { popularity: 40, vote_average: 4 };
    const fakeMovieB = { popularity: 10, vote_average: 7 };
    const fakeMovieC = { popularity: 70, vote_average: 2 };

    const fakeState = {
      movies: [fakeMovieA, fakeMovieB, fakeMovieC]
    };

    it.each`
      property          | order    | expected
      ${"popularity"}   | ${true}  | ${[fakeMovieB, fakeMovieA, fakeMovieC]}
      ${"popularity"}   | ${false} | ${[fakeMovieC, fakeMovieA, fakeMovieB]}
      ${"vote_average"} | ${true}  | ${[fakeMovieC, fakeMovieA, fakeMovieB]}
      ${"vote_average"} | ${false} | ${[fakeMovieB, fakeMovieA, fakeMovieC]}
    `(
      "sorts movies by property=$property and order=$order",
      ({ property, order, expected }) => {
        mutations.setSort(fakeState, { property, order });
        expect(fakeState.movies).toEqual(expected);
      }
    );
  });

  describe("mutations setFilter", () => {
    const fakeState = {
      filterRating: 0,
      filterGenres: { 0: false, 1: false, 2: false }
    };

    it("sets rating filter", () => {
      mutations.setFilter(fakeState, { type: "rating", value: 4 });
      expect(fakeState.filterRating).toBe(4);
    });

    it("toggles genres filter", () => {
      mutations.setFilter(fakeState, { type: "genres", value: 0 });
      expect(fakeState.filterGenres[0]).toBe(true);
      mutations.setFilter(fakeState, { type: "genres", value: 0 });
      expect(fakeState.filterGenres[0]).toBe(false);

      mutations.setFilter(fakeState, { type: "genres", value: 2 });
      expect(fakeState.filterGenres[2]).toBe(true);
    });
  });

  describe("mutations setError", () => {
    it("sets errorMessage", () => {
      const fakeState = {};
      mutations.setError(fakeState, "test message");
      expect(fakeState.error).toEqual("test message");
    });
  });

  describe("actions fetchConfiguration", () => {
    const fakeUrl = "fakeUrl";
    const fakePosterSizes = ["w100", "w200"];
    const fakeBackdropSizes = ["w50"];
    const commit = jest.fn();

    beforeAll(() => {
      global.fetch = jest.fn(() => ({
        json: () => ({
          images: {
            base_url: fakeUrl,
            poster_sizes: fakePosterSizes,
            backdrop_sizes: fakeBackdropSizes
          }
        })
      }));

      return actions.fetchConfiguration({ commit });
    });

    it("calls fetch", () => {
      expect(global.fetch).toHaveBeenCalledWith(api.CONFIGURATION());
    });

    it("commits setConfiguration", () => {
      expect(commit).toHaveBeenCalledWith("setConfiguration", {
        imageBaseUrl: fakeUrl,
        posterSizes: fakePosterSizes,
        backdropSizes: fakeBackdropSizes
      });
    });
  });

  describe("actions fetchMovies", () => {
    const fakeMovies = [{ title: "movieA" }, { title: "movieB" }];
    const commit = jest.fn();

    beforeAll(() => {
      global.fetch = jest.fn(() => ({
        json: () => ({ results: fakeMovies })
      }));

      return actions.fetchMovies({ commit });
    });

    it("calls fetch", () => {
      expect(global.fetch).toHaveBeenCalledWith(api.NOW_PLAYING());
    });

    it("commits setMovies", () => {
      expect(commit).toHaveBeenCalledWith("setMovies", fakeMovies);
    });
  });

  describe("actions fetchGenres", () => {
    const fakeGenres = [{ id: 0, name: "A" }, { id: 1, name: "B" }];
    const commit = jest.fn();

    beforeAll(() => {
      global.fetch = jest.fn(() => ({
        json: () => ({ genres: fakeGenres })
      }));

      return actions.fetchGenres({ commit });
    });

    it("calls fetch", () => {
      expect(global.fetch).toHaveBeenCalledWith(api.GENRES_LIST());
    });

    it("commits setMovies", () => {
      expect(commit).toHaveBeenCalledWith("setGenres", fakeGenres);
    });
  });

  describe("actions initialFetch", () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => Promise.resolve());

    beforeAll(() => {
      return actions.initialFetch({ commit, dispatch });
    });

    it("dispatches actions", () => {
      expect(dispatch).toHaveBeenCalledWith("fetchConfiguration");
      expect(dispatch).toHaveBeenCalledWith("fetchMovies");
      expect(dispatch).toHaveBeenCalledWith("fetchGenres");
    });

    it("commits setSort", () => {
      expect(commit).toHaveBeenCalledWith("setSort", {
        property: "popularity",
        order: false
      });
    });
  });

  describe("error handling", () => {
    it("initialFetch", async () => {
      const commit = jest.fn();
      const dispatch = jest.fn(() => Promise.reject("test error"));

      await actions.initialFetch({ commit, dispatch });

      expect(commit).toHaveBeenCalledWith("setError", "test error");
    });

    it.each`
      action                  | name
      ${"fetchConfiguration"} | ${"FetchConfiguration"}
      ${"fetchMovies"}        | ${"FetchMovies"}
      ${"fetchGenres"}        | ${"FetchGenres"}
    `(
      "action $action thows error when network down",
      async ({ action, name }) => {
        global.fetch = jest.fn(() => Promise.reject());

        try {
          await actions[action]({});
        } catch (e) {
          expect(e).toEqual(`${name} failed, check your network and try again`);
        }
      }
    );

    it.each`
      action                  | name                    | fakeResponse
      ${"fetchConfiguration"} | ${"FetchConfiguration"} | ${{ fakeResponse: "" }}
      ${"fetchMovies"}        | ${"FetchMovies"}        | ${{}}
      ${"fetchGenres"}        | ${"FetchGenres"}        | ${{ images: "" }}
    `(
      "action $action throws error when response invalid",
      async ({ action, name, fakeResponse }) => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => fakeResponse
          })
        );

        try {
          await actions[action]({});
        } catch (e) {
          expect(e).toEqual(`${name} returned invalid result`);
        }
      }
    );
  });
});
