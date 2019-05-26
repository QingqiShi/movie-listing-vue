<template>
  <div id="app" class="app--mounted">
    <template v-if="loading">
      <div class="app__load-wrapper">
        <spinner />
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  components: {
    Spinner
  },
  data: () => ({
    loading: true
  }),
  async mounted() {
    await this.$store.dispatch("initialFetch");
    this.loading = false;
  }
};
</script>

<style lang="scss">
@import "@/styles/_reset.scss";

.app {
  &__load-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
