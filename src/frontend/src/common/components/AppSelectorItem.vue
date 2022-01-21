<template>
  <span class="filling" :class="`filling--${value}`">
    <slot />
  </span>
</template>

<script>
export default {
  name: "AppSelectorItem",
  props: {
    value: String,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/filling.scss";
</style>
