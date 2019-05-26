const state = {
  configuration: {
    imageBaseUrl: "https://images.com/",
    posterSizes: ["w100", "w300", "original"],
    backdropSizes: ["w100", "w300", "original"]
  },
  movies: [
    {
      id: 1000,
      title: "Avatar",
      genre_ids: [0],
      popularity: 230,
      vote_average: 5
    }
  ],
  genres: [{ id: 0, name: "Action" }, { id: 1, name: "Horror" }],
  sortOrder: false,
  sortProperty: "popularity",
  filterRating: 3,
  filterGenres: { 0: false, 1: true },
  error: ""
};

const getters = {
  /** @param {typeof state} state */
  ratingFilteredMovies: state => state.movies,
  availableGenres: () => [{ id: 0, name: "Action" }],
  filteredMovies: () => []
};

const mutations = {
  setConfiguration: jest.fn(),
  setMovies: jest.fn(),
  setGenres: jest.fn(),
  setSort: jest.fn(),
  setFilter: jest.fn(),
  setError: jest.fn()
};

const actions = {
  initialFetch: jest.fn(() => Promise.resolve()),
  fetchConfiguration: jest.fn(() => Promise.resolve()),
  fetchMovies: jest.fn(() => Promise.resolve()),
  fetchGenres: jest.fn(() => Promise.resolve())
};

export default { state, getters, mutations, actions };
