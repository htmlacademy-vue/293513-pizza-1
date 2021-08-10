<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="order.name"
      />

      <div class="product__text">
        <h2>{{ order.name }}</h2>
        <ul>
          <li>{{ getSize }} см, {{ getDough }}</li>
          <li>Соус: {{ getSauce }}</li>
          <li>Начинка: {{ getIngredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="decrementOrder(order)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>

      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="order.quantity"
        readonly
      />

      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="incrementOrder(order)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ totalSum }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { pizzaSizeNumber } from "@/common/enums/pizzasSize";
import { SAUCES_TYPE } from "@/common/constants";
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  CHANGE_BUILDER,
  DECREMENT_ORDER,
  INCREMENT_ORDER,
  REMOVE_ORDER,
} from "@/store/mutations-types";

export default {
  name: "CartOrderItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Cart", ["totalSum"]),

    getSize() {
      return pizzaSizeNumber[this.order.size];
    },

    getDough() {
      if (this.order.dough === "light") {
        return "на тонком тесте";
      } else {
        return "на толстом тесте";
      }
    },

    getSauce() {
      const sauce = SAUCES_TYPE.find((item) => item.value === this.order.sauce);
      return sauce.name.toLowerCase();
    },

    getIngredients() {
      const ingredients = this.order.ingredients.map((item) =>
        item.name.toLowerCase()
      );
      return ingredients.join(", ");
    },
  },

  methods: {
    ...mapMutations("Builder", {
      changeBuilder: CHANGE_BUILDER,
    }),

    ...mapMutations("Cart", {
      removeOrder: REMOVE_ORDER,
      incrementOrder: INCREMENT_ORDER,
    }),

    ...mapActions("Cart", {
      decrementOrder: DECREMENT_ORDER,
    }),

    changePizza() {
      this.changeBuilder(this.order);
      this.removeOrder(this.order);
      this.$router.push("/");
    },
  },
};
</script>
