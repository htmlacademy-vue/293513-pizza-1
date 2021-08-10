<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="additional.image"
        width="39"
        height="60"
        :alt="additional.name"
      />
      <span>{{ additional.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="decrement(additional)"
          :disabled="!additional.quantity"
        >
          <span class="visually-hidden">Меньше</span>
        </button>

        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="additional.quantity"
          readonly
        />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="increment(additional)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>{{ additional.price }} ₽/шт.</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { DECREMENT_MISC, INCREMENT_MISC } from "@/store/mutations-types";

export default {
  name: "CartAdditionalItem",
  props: {
    additional: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Cart", {
      increment: INCREMENT_MISC,
      decrement: DECREMENT_MISC,
    }),
  },
};
</script>
