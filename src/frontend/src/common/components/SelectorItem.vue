<template>
  <span class="filling" :class="`filling--${value}`">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    value: String,
  },
};
</script>
