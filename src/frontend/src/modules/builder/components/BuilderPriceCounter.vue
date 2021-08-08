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
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", {
      total: "totalSum",
      disabled: "isDisableCook",
    }),
  },
};
</script>
