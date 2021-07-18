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
      <app-drop
        @drop="
          $emit('drop', {
            value: $event.value,
            count: $event.count + 1,
          })
        "
      >
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
      </app-drop>
    </div>

    <builder-price-counter />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
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
