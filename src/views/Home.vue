<template>
  <div class="home">
    <action-bar />
    <movie-list />
    <error-modal v-if="error">{{ error }}</error-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from "@/components/MovieList.vue";
import ActionBar from "@/components/ActionBar.vue";
import ErrorModal from "@/components/ErrorModal.vue";

export default {
  name: "Home",
  components: {
    ActionBar,
    MovieList,
    ErrorModal
  },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    error() {
      return this.$store.state.movies.error;
    }
  },
  mounted() {
    // Restore url query
    const { sortOrder, sortProperty, ratingFilter, genreFilter } = this.query;

    if (sortOrder !== undefined || sortProperty !== undefined) {
      this.$store.commit("setSort", {
        property:
          sortProperty !== undefined
            ? sortProperty
            : this.$store.state.movies.sortProperty,
        order:
          sortOrder !== undefined
            ? sortOrder
            : this.$store.state.movies.sortOrder
      });
    }

    if (ratingFilter !== undefined) {
      this.$store.commit("setFilter", {
        type: "rating",
        value: ratingFilter
      });
    }

    if (genreFilter) {
      genreFilter.forEach(genreId => {
        this.$store.commit("setFilter", {
          type: "genre",
          value: genreId
        });
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  padding-top: 6rem;

  @include breakpoint(tablet) {
    padding-top: 3rem;
  }
}
</style>
