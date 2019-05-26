<template>
  <div class="filter">
    <span class="filter__label">Filter By</span>
    <dropdown :count="options.length + 4">
      <template #trigger>
        <span class="filter__dropdown-trigger">
          Showing {{ movies.length }} of {{ $store.state.movies.movies.length }}
        </span>
      </template>
      <template #options>
        <div class="filter__dropdown-label">Minimum Rating</div>
        <div class="filter__dropdown-option filter__dropdown-rating">
          <range-input
            :min="0"
            :max="10"
            :step="0.5"
            :value="rating"
            @input="updateRating"
          />
          <span>{{ rating }}</span>
        </div>

        <div class="filter__dropdown-label">Genres</div>
        <div
          v-for="option in options"
          :key="option.id"
          class="filter__dropdown-option filter__genre-option"
          @click="updateGenre(option.id)"
        >
          <span>{{ option.name }}</span>
          <span>
            <icon
              :name="
                genres[option.id] ? 'check_box' : 'check_box_outline_blank'
              "
            />
          </span>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "@/components/Icon.vue";
import RangeInput from "@/components/RangeInput.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  components: { Icon, RangeInput, Dropdown },
  computed: {
    /** @type {{rating:number}} */
    ...mapState({
      rating: state => state.movies.filterRating,
      genres: state => state.movies.filterGenres
    }),
    ...mapGetters({
      options: "availableGenres",
      movies: "filteredMovies"
    })
  },
  methods: {
    updateRating(val) {
      this.$store.commit("setFilter", { type: "rating", value: val });
      this.$router.push({
        query: { ...this.$router.currentRoute.query, ratingFilter: val }
      });
    },
    updateGenre(id) {
      this.$store.commit("setFilter", { type: "genre", value: id });
      this.$router.push({
        query: {
          ...this.$router.currentRoute.query,
          genreFilter: Object.keys(this.genres)
            .filter(genreId => this.genres[genreId])
            .join(",")
        }
      });
    }
  }
};
</script>

<style lang="scss">
.filter {
  height: 100%;
  display: flex;
  align-items: center;

  &__label {
    margin-right: 0.5rem;
  }

  &__dropdown {
    &-trigger,
    &-option,
    &-label {
      padding: 0.4rem 0.8rem;
    }

    &-trigger {
      display: block;
    }

    &-option {
      &:hover {
        background: $accent;
        color: $on-primary;
      }
    }

    &-label {
      color: $secondary;
      font-family: $font-heading;
    }

    &-rating {
      display: flex;
      align-items: center;

      input {
        flex-grow: 1;
      }

      span:last-of-type {
        min-width: 2rem;
        text-align: right;
      }
    }
  }

  &__genre-option {
    display: flex;
    cursor: pointer;

    span:first-of-type {
      flex-grow: 1;
    }

    span:last-of-type .material-icons {
      font-size: 1em;
    }
  }
}
</style>
