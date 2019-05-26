<template>
  <div class="action-bar">
    <h1 class="action-bar__title">
      Movie Listing Vue
      <span class="action-bar__author">By Qingqi Shi</span>
    </h1>
    <div class="action-bar__spacer"></div>
    <div class="action-bar__actions">
      <action-sort />
      <action-filter />
    </div>
  </div>
</template>

<script>
import ActionSort from "@/components/ActionSort.vue";
import ActionFilter from "@/components/ActionFilter.vue";

export default {
  components: {
    ActionSort,
    ActionFilter
  }
};
</script>

<style lang="scss">
.action-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background: RGBA($primary-rgb, 0.8);
  z-index: 200;
  display: flex;
  padding: 0 1rem;
  backdrop-filter: blur(1rem);

  @include breakpoint(tablet) {
    height: 3rem;
  }

  &__title {
    display: none;

    @include breakpoint(tablet) {
      display: inline;
      font-size: 1rem;
      color: $on-primary;
      margin: 0;
      line-height: 3rem;
    }
  }

  &__author {
    display: none;

    @include breakpoint(laptop) {
      display: inline;
      font-family: $font-body;
      font-size: 0.8rem;
      margin-left: 0.5rem;
    }
  }

  &__actions {
    text-align: right;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;

    @include breakpoint(tablet) {
      flex-direction: row;
    }
  }

  &__spacer {
    @include breakpoint(tablet) {
      flex-grow: 1;
    }
  }
}
</style>
