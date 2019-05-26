import Vue from "vue";
import Vuex from "vuex";
import movies from "@/stores/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { movies }
});
