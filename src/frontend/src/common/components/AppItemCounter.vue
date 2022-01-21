<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value <= min"
      @click="$emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      readonly
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    />

    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value >= max"
      @click="$emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
    },

    max: {
      type: Number,
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/counter.scss";
</style>
