<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="name"
        data-test="builder-input-name"
        @input="setNamePizza($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <app-drop
        @drop="
          changeCountIngredient({
            value: $event.value,
            count: $event.count + 1,
          })
        "
      >
        <div
          class="pizza"
          :class="`pizza--foundation--${size}-${sauce}`"
          data-test="builder-pizza-view"
        >
          <div class="pizza__wrapper">
            <transition-group
              name="drop"
              mode="out-in"
            >
              <template v-for="ingredient in selectedIngredients">
                <div
                  :key="ingredient.id"
                  class="pizza__filling"
                  :class="`pizza__filling--${ingredient.value}`"
                />

                <div
                  v-if="ingredient.count > 1"
                  :key="`${ingredient.id}-1`"
                  :class="`pizza__filling pizza__filling--${ingredient.value} pizza__filling--second`"
                />

                <div
                  v-if="ingredient.count > 2"
                  :key="`${ingredient.id}-2`"
                  :class="`pizza__filling pizza__filling--${ingredient.value} pizza__filling--third`"
                />
              </template>
            </transition-group>
          </div>
        </div>
      </app-drop>
    </div>

    <builder-price-counter />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
  computed: {
    ...mapState("Builder", {
      doughSize: "dough",
      sauce: "sauce",
      name: "namePizza",
    }),

    ...mapGetters("Builder", {
      selectedIngredients: "selectedIngredients",
    }),

    size() {
      if (this.doughSize === "light") {
        return "small";
      }

      return "big";
    },
  },

  methods: {
    ...mapActions("Builder", ["setNamePizza", "changeCountIngredient"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/pizza.scss";
.drop-enter-active {
  animation: drop 500ms;
}

.drop-leave-active {
  animation: drop 500ms reverse;
}

@keyframes drop {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(0deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
