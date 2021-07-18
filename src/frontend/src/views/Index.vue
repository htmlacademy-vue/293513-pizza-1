<template>
  <app-layout>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <builder-dough-selector
            :dough-list="doughList"
            :value="dough"
            @change="setDough"
          />

          <builder-size-selector
            :sizes="sizes"
            :value="size"
            @change="setSize"
          />

          <builder-ingredients-selector
            :sauces="sauces"
            :value-sauce="sauce"
            :ingredients="ingredients"
            @changeSauce="setSauces"
          />

          <builder-pizza-view
            :dough-size="dough"
            :sauce="sauce"
            :checked-ingredients="checkedIngredients"
            @drop="changeCountIngredient"
          />
        </div>
      </form>
    </main>
  </app-layout>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import AppLayout from "@/layouts/AppLayout";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

export default {
  name: "IndexHome",
  components: {
    AppLayout,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
  },
  data() {
    return {
      user,
      misc,
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeIngredient(ingredient)
      ),
      doughList: pizza.dough.map((dough) => normalizeDough(dough)),
      dough: "light",
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      size: "small",
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      sauce: "tomato",
    };
  },
  methods: {
    setDough(value) {
      this.dough = value;
    },
    setSize(value) {
      this.size = value;
    },
    setSauces(value) {
      this.sauce = value;
    },
    changeCountIngredient({ value, count }) {
      const ingredient = this.ingredients.find((it) => it.value === value);
      ingredient.count = count;
    },
  },
  computed: {
    checkedIngredients() {
      return this.ingredients.filter((it) => it.count > 0);
    },
  },
};
</script>
