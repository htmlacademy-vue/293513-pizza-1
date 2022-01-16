<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />

      <div class="product__text">
        <h2>{{ pizza.name }}</h2>

        <ul>
          <li>
            {{ getSize }},
            {{ getDoughText }}
          </li>
          <li>Соус: {{ getSauce }}</li>
          <li>Начинка: {{ getIngredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      <span v-if="pizza.quantity > 1" data-test="pizza-multiplier">
        {{ pizza.quantity }}x
      </span>
      <span>{{ sumPricePizza(pizza) }} ₽</span>
    </p>
  </li>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "OrderItemPizza",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", ["sizes", "doughList", "sauces", "ingredients"]),
    ...mapGetters("Orders", ["sumPricePizza"]),

    getSize() {
      const size = this.sizes.find((it) => it.id === this.pizza.sizeId);
      return size.name;
    },

    getDoughText() {
      const dough = this.doughList.find((it) => it.id === this.pizza.doughId);

      if (dough.value === "light") {
        return "на тонком тесте";
      } else {
        return "на толстом тесте";
      }
    },

    getSauce() {
      const sauce = this.sauces.find((it) => it.id === this.pizza.sauceId);
      return sauce.name.toLowerCase();
    },

    getIngredients() {
      const ingredientsList = this.pizza.ingredients.map((item) => {
        const ingredient = this.ingredients.find(
          (it) => it.id === item.ingredientId
        );

        return ingredient.name.toLowerCase();
      });

      return ingredientsList.join(", ");
    },
  },
};
</script>
