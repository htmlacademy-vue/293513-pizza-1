<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': !disabled }"
      :disabled="disabled"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { ADD_TO_CART } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", {
      total: "totalSum",
      disabled: "isDisableCook",
      ingredients: "selectedIngredients",
    }),

    ...mapState("Builder", {
      name: "namePizza",
      dough: "dough",
      size: "size",
      sauce: "sauce",
    }),
  },
  methods: {
    ...mapActions("Cart", {
      addToCart: ADD_TO_CART,
    }),
  },
};
</script>
