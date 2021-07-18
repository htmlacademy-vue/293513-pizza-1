<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="`pizza--foundation--${size}-${sauce}`">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in checkedIngredients"
            :key="ingredient.id"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.value}`,
              {
                'pizza__filling--second': ingredient.count === 2,
                'pizza__filling--third': ingredient.count === 3,
              },
            ]"
          />
        </div>
      </div>
    </div>

    <builder-price-counter />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  props: {
    doughSize: {
      type: String,
      required: true,
      validator: (value) => ["light", "large"].includes(value),
    },
    sauce: {
      type: String,
      required: true,
      validator: (value) => ["tomato", "creamy"].includes(value),
    },
    checkedIngredients: {
      type: Array,
      defaults: [],
    },
  },
  computed: {
    size() {
      if (this.doughSize === "light") {
        return "small";
      }

      return "big";
    },
  },
};
</script>
