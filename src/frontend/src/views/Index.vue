<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="/">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

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

          <builder-pizza-view />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
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
  },
};
</script>
