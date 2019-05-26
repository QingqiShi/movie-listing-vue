<template>
  <div class="error-modal__backdrop">
    <div class="error-modal">
      <icon name="error" />
      <span><slot /></span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: { Icon }
};
</script>

<style lang="scss">
.error-modal {
  width: 40%;
  max-width: 15rem;
  background-color: $error;
  color: $on-error;
  transform: translate(0, -20vh);
  padding: 1rem;
  border-radius: 0.3rem;
  text-align: center;

  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .material-icons {
    display: block;
    font-size: 4rem;
    margin-bottom: 2rem;
  }
}
</style>
