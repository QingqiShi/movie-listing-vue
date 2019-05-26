<template>
  <div class="sort">
    <span class="sort__label">Sort By</span>
    <template v-for="(link, i) of links">
      <a
        :key="`sort-link-${link.property}`"
        :class="link.class"
        href="#"
        @click="link.handleClick"
      >
        {{ link.label }}
        <span v-if="link.active">{{ sortOrder ? "↑" : "↓" }}</span>
      </a>
      <span v-if="i == 0" :key="`sort-${i}`" class="sort__seperator">|</span>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      sortOrder: state => state.movies.sortOrder,
      sortProperty: state => state.movies.sortProperty
    }),
    links() {
      const popularityActive = this.sortProperty === "popularity";
      const popularityLink = {
        property: "popularity",
        label: "Popularity",
        active: popularityActive,
        class: {
          sort__link: true,
          "sort__link--popularity": true,
          "sort__link--active": popularityActive
        },
        handleClick: () => this.updateSort("popularity")
      };

      const ratingActive = this.sortProperty === "vote_average";
      const ratingLink = {
        property: "vote_average",
        label: "Rating",
        active: ratingActive,
        class: {
          sort__link: true,
          "sort__link--vote_average": true,
          "sort__link--active": ratingActive
        },
        handleClick: () => this.updateSort("vote_average")
      };

      return [popularityLink, ratingLink];
    }
  },
  methods: {
    updateSort(property) {
      const newOrder = this.sortProperty === property ? !this.sortOrder : false;
      this.$store.commit("setSort", {
        property,
        order: newOrder
      });
      this.$router.push({
        query: {
          ...this.$router.currentRoute.query,
          sortProperty: property,
          sortOrder: newOrder
        }
      });
    }
  }
};
</script>

<style lang="scss">
.sort {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 1rem;

  &__link {
    color: $accent;
    font-family: $font-heading;
    text-decoration: none;
    border-radius: 0.3rem;

    &:hover {
      color: $on-primary;
    }

    &--active {
      padding: 0.4rem 0.8rem;
      color: $on-primary;
      background-color: $accent;

      &:hover {
        color: $accent;
        background-color: $on-primary;
      }
    }
  }

  &__label {
    margin-right: 0.5rem;
  }

  &__seperator {
    margin: 0 0.5rem;
  }
}
</style>
