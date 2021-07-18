<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': !disabled }"
      :disabled="disabled"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
