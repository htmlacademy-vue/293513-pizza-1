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
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>

      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="order.quantity"
      />

      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ order.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import { pizzaSizeNumber } from "@/common/enums/pizzasSize";
import { SAUCES_TYPE } from "@/common/constants";

export default {
  name: "CartOrderItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
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
};
</script>
