<template functional>
  <div class="chips"><slot /></div>
</template>

<script>
export default {
  props: []
};
</script>

<style lang="scss">
.chips {
  font-family: $font-heading;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: calc(0.5em + 0.5rem);
  background: $on-primary;
  color: $accent;
  white-space: nowrap;
}
</style>
