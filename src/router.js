import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: route => ({
        query: {
          sortProperty: route.query.sortProperty,
          sortOrder: route.query.sortOrder && route.query.sortOrder === "true",
          ratingFilter:
            route.query.ratingFilter && parseInt(route.query.ratingFilter),
          genreFilter:
            route.query.genreFilter &&
            route.query.genreFilter.split(",").map(id => parseInt(id))
        }
      })
    }
  ]
});
