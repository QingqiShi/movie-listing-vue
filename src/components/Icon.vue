<template>
  <i class="material-icons">{{ name }}</i>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "home" }
  }
};
</script>
