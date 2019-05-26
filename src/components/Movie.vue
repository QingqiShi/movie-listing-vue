<template>
  <div class="movie">
    <movie-image
      class="movie__image"
      :src="movie.poster_path"
      type="poster"
      :target-width="400"
    />
    <transition-group tag="div" class="movie__badge" name="flip-list">
      <div
        v-for="badge in badgeList"
        :key="`movie-badge-${movie.id}-${badge.name}`"
        :class="badge.class"
      >
        <icon :name="badge.icon" />
        <span>{{ badge.value }}</span>
      </div>
    </transition-group>
    <div class="movie__genres">
      <div
        v-for="genreId in movie.genre_ids"
        :key="`movie-genres-${movie.id}-${genreId}`"
        class="movie__genres-genre"
      >
        <chip>{{ genres.find(genre => genre.id === genreId).name }}</chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon.vue";
import MovieImage from "@/components/MovieImage.vue";
import Chip from "@/components/Chip.vue";

export default {
  components: { Icon, MovieImage, Chip },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      genres: state => state.movies.genres
    }),
    sort() {
      return this.$store.state.movies.sortProperty;
    },
    badgeList() {
      const list = [
        {
          name: "popularity",
          class: {
            movie__popularity: true,
            "movie__badge--active": this.sort === "popularity"
          },
          property: "popularity",
          icon: "whatshot",
          value: this.movie.popularity.toFixed(1)
        },
        {
          name: "rating",
          class: {
            movie__rating: true,
            "movie__badge--active": this.sort === "vote_average"
          },
          property: "vote_average",
          icon: "star",
          value: this.movie.vote_average
        }
      ];

      return this.sort === "popularity" ? list : list.reverse();
    }
  }
};
</script>

<style lang="scss">
.movie {
  height: 0;
  padding-bottom: 150%;
  position: relative;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &__image,
  &__badge {
    will-change: transform;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__image {
    transition: 0.2s transform;

    .movie:hover & {
      transform: scale(1.2);
    }
  }

  &__popularity,
  &__rating {
    display: flex;
    padding-bottom: 0.3rem;

    .material-icons {
      vertical-align: sub;
      display: inline;
      margin-right: 0.5rem;
      line-height: 1rem;
      font-size: 0.8rem;
    }

    span {
      font-family: $font-heading;
      display: block;
      flex-grow: 1;
      line-height: 1rem;
      font-size: 0.8rem;
    }
  }

  &__badge {
    transition: 0.2s font-size;
    padding: 0.5rem;
    background: linear-gradient(
      135deg,
      RGBA($primary-rgb, 1) 0%,
      RGBA($primary-rgb, 0) 15%
    );

    .movie:hover & {
      background: linear-gradient(
        135deg,
        RGBA($accent-rgb, 1) 0%,
        RGBA($accent-rgb, 0) 15%
      );
    }

    &--active {
      span,
      .material-icons {
        font-size: 1.2rem;
      }
    }
  }

  &__genres {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 2rem 2rem;
    overflow: auto;
    opacity: 0;
    max-height: 100%;
    transition: 0.2s opacity;

    &::-webkit-scrollbar {
      display: none;
    }

    .movie:hover & {
      opacity: 1;
    }

    &-genre {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
