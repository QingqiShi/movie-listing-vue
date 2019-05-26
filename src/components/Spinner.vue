<template functional>
  <div class="spinner">
    <div class="spinner__wrapper">
      <div class="spinner__A"></div>
      <div class="spinner__B"></div>
      <div class="spinner__C"></div>
    </div>
  </div>
</template>

<script>
/**
 * Purely functional component to display a loading spinner
 */
export default {};
</script>

<style lang="scss">
.spinner {
  &__wrapper {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    margin: 2rem auto;
  }

  &__A,
  &__B,
  &__C {
    background: $on-primary;
    width: 0.7rem;
    height: 3rem;
    animation: spinner 1s infinite ease-in-out;
  }

  &__A {
    animation-delay: -0.16s;
  }

  &__C {
    animation-delay: 0.16s;
  }
}

@keyframes spinner {
  0%,
  80%,
  100% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(1.4);
  }
}
</style>
