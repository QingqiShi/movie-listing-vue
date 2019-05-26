<template>
  <transition-group tag="div" name="flip-list" class="movie-list">
    <movie
      v-for="(movie, i) in movies"
      :key="`movie-${movie.id}`"
      :movie="movie"
      :tabindex="i"
    />
  </transition-group>
</template>

<script>
import { mapGetters } from "vuex";
import Movie from "@/components/Movie.vue";

export default {
  components: { Movie },
  computed: {
    ...mapGetters({
      movies: "filteredMovies"
    })
  }
};
</script>

<style lang="scss">
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  > .movie {
    transition: all 0.5s;
  }
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.flip-list-leave-active {
  position: absolute;
}
</style>
