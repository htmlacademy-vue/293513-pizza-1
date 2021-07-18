<template>
  <span class="filling" :class="`filling--${value}`">
    <slot />
  </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    value: String,
  },
};
</script>
