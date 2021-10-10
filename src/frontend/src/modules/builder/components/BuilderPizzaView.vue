<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="name"
        @input="setName($event.target.value)"
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
        <div class="pizza" :class="`pizza--foundation--${size}-${sauce}`">
          <div class="pizza__wrapper">
            <transition-group name="drop" mode="out-in">
              <template v-for="ingredient in selectedIngredients">
                <div
                  :key="ingredient.id"
                  class="pizza__filling"
                  :class="`pizza__filling--${ingredient.value}`"
                />

                <div
                  v-if="ingredient.count > 1"
                  :key="`${ingredient.id}-${Math.random()}`"
                  :class="`pizza__filling pizza__filling--${ingredient.value} pizza__filling--second`"
                />

                <div
                  v-if="ingredient.count > 2"
                  :key="`${ingredient.id}-${Math.random()}`"
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
import { mapGetters, mapMutations, mapState } from "vuex";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
import {
  CHANGE_COUNT_INGREDIENT,
  SET_NAME_PIZZA,
} from "@/store/mutations-types";

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
    ...mapMutations("Builder", {
      setName: SET_NAME_PIZZA,
      changeCountIngredient: CHANGE_COUNT_INGREDIENT,
    }),
  },
};
</script>

<style lang="scss" scoped>
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
