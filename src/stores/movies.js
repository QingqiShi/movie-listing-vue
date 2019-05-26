import api from "@/constants/api";
import app from "@/constants/app";

const { CONFIGURATION, NOW_PLAYING, GENRES_LIST } = api;
const { LOCALE } = app;

const state = {
  configuration: {},
  /** @type {Movie[]} List of all movies */
  movies: [],
  /** @type {Genre[]} List of all genres */
  genres: [],
  /** @type {boolean} True for accending, false for decending */
  sortOrder: false,
  /** @type {"popularity"|"vote_average"} */
  sortProperty: "popularity",
  /** @type {number} Number between 0 and 10 */
  filterRating: 3,
  /** @type {{[id:number]: boolean}} */
  filterGenres: {},
  /** @type {string} */
  error: ""
};

const getters = {
  /** @type {(state:State) => Movie[]} */
  ratingFilteredMovies: state =>
    state.movies.filter(movie => movie.vote_average >= state.filterRating),

  /** @type {(state:State, getters:Getters) => Genre[]} */
  availableGenres: (state, getters) =>
    state.genres.filter(genre => {
      for (let movie of getters.ratingFilteredMovies) {
        if (movie.genre_ids.includes(genre.id)) {
          return true;
        }
      }
      return state.filterGenres[genre.id];
    }),

  /** @type {(state:State, getters:Getters) => Movie[]} */
  filteredMovies: (state, getters) => {
    const { availableGenres, ratingFilteredMovies } = getters;
    const { filterGenres } = state;

    const genres = availableGenres.filter(genre => filterGenres[genre.id]);
    if (!genres.length) return ratingFilteredMovies;

    return ratingFilteredMovies.filter(({ genre_ids }) =>
      genres.reduce((show, genre) => show && genre_ids.includes(genre.id), true)
    );
  }
};

const mutations = {
  /** @type {(state:State, payload:Configuration) => void} */
  setConfiguration(state, { imageBaseUrl, posterSizes, backdropSizes }) {
    state.configuration = { imageBaseUrl, posterSizes, backdropSizes };
  },

  /** @type {(state:State, movies:Movie[]) => void} */
  setMovies(state, movies) {
    state.movies = movies;
  },

  /** @type {(state:State, genres:Genre[]) => void} */
  setGenres(state, genres) {
    state.genres = genres;
    state.filterGenres = {};
    genres.forEach(genre => {
      state.filterGenres[genre.id] = false;
    });
  },

  /** @type {(state:State, payload:{property:SortProperty, order:boolean}) => void} */
  setSort(state, { property, order }) {
    state.sortOrder = order;
    state.sortProperty = property;
    state.movies = state.movies.sort((a, b) =>
      order ? a[property] - b[property] : b[property] - a[property]
    );
  },

  /** @type {(state:State, payload:{type:"rating"|"genres", value:number}) => void} */
  setFilter(state, { type, value }) {
    if (type === "rating") {
      state.filterRating = value;
    } else {
      const newFilters = { ...state.filterGenres };
      newFilters[value] = !state.filterGenres[value];
      state.filterGenres = newFilters;
    }
  },

  /** @type {(state:State, errorMsg:string) => void} */
  setError(state, errorMsg) {
    state.error = errorMsg;
  }
};

const actions = {
  /** @param {import('vuex').ActionContext} context */
  async initialFetch({ commit, dispatch }) {
    try {
      await Promise.all([
        dispatch("fetchConfiguration"),
        dispatch("fetchMovies"),
        dispatch("fetchGenres")
      ]);
      commit("setSort", { property: "popularity", order: false });
    } catch (e) {
      commit("setError", e);
    }
  },

  /** @param {import('vuex').ActionContext} context */
  async fetchConfiguration({ commit }) {
    const result = await fetchApi(
      CONFIGURATION(),
      "FetchConfiguration",
      result => result && result.images
    );

    commit("setConfiguration", {
      imageBaseUrl: result.images.base_url,
      posterSizes: result.images.poster_sizes,
      backdropSizes: result.images.backdrop_sizes
    });
  },

  /** @param {import('vuex').ActionContext} context */
  async fetchMovies({ commit }) {
    const result = await fetchApi(
      NOW_PLAYING(LOCALE),
      "FetchMovies",
      result => result && result.results
    );

    commit("setMovies", result.results);
  },

  /** @param {import('vuex').ActionContext} context */
  async fetchGenres({ commit }) {
    const result = await fetchApi(
      GENRES_LIST(LOCALE),
      "FetchGenres",
      result => result && result.genres
    );

    commit("setGenres", result.genres);
  }
};

/**
 * @param {string} url
 * @param {string} name
 */
async function fetchApi(url, name, validator) {
  let result;

  try {
    const response = await fetch(url);
    result = await response.json();
  } catch {
    throw `${name} failed, check your network and try again`;
  }

  if (!validator(result)) {
    throw `${name} returned invalid result`;
  }

  return result;
}

export default { state, getters, mutations, actions };

/* Type definitions to help vscode do auto suggest */

/** @typedef {{id:number, name:string}} Genre */
/**
 * @typedef {object} Movie
 * @property {number} Movie.id
 * @property {string} Movie.title
 * @property {number} Movie.popularity
 * @property {number} Movie.vote_average
 * @property {number[]} Movie.genre_ids
 * @property {string} Movie.poster_path
 */
/**
 * @typedef {object} Configuration
 * @property {string} Configuration.imageBaseUrl
 * @property {string} Configuration.posterSizes
 * @property {string} Configuration.backdropSizes
 */
/** @typedef {typeof state} State */
/**
 * @typedef {object} Getters
 * @property {Movie[]} Getters.ratingFilteredMovies
 * @property {Genre[]} Getters.availableGenres
 * @property {Movie[]} Getters.filteredMovies
 */
/** @typedef {typeof state.sortProperty} SortProperty */
