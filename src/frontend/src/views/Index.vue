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

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <radio-button
                  class="dough__input"
                  name="dough"
                  v-for="doughItem in doughList"
                  :key="doughItem.id"
                  :value="doughItem.value"
                  :checked="doughItem.value === dough"
                  @change="setDough"
                  :class="`dough__input--${doughItem.value}`"
                >
                  <b>{{ doughItem.name }}</b>
                  <span>{{ doughItem.description }}</span>
                </radio-button>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <radio-button
                  class="diameter__input"
                  name="diameter"
                  :class="`diameter__input--${size.value}`"
                  v-for="size in sizes"
                  :key="size.id"
                  :value="size.value"
                  :checked="size.value === diameter"
                  @change="setDiameter"
                >
                  <span>{{ size.name }}</span>
                </radio-button>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <radio-button
                    class="radio ingredients__input"
                    name="sauce"
                    v-for="sauceItem in sauces"
                    :key="sauceItem.id"
                    :value="sauceItem.value"
                    :checked="sauceItem.value === sauce"
                    @change="setSauces"
                  >
                    <span>{{ sauceItem.name }}</span>
                  </radio-button>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                    >
                      <selector-item :value="ingredient.value">
                        {{ ingredient.name }}
                      </selector-item>

                      <item-counter
                        class="ingredients__counter"
                        v-model="ingredient.count"
                        :min="0"
                        :max="3"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

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
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";

import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

export default {
  name: "IndexHome",
  components: {
    RadioButton,
    ItemCounter,
    SelectorItem,
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
      diameter: "small",
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      sauce: "tomato",
    };
  },
  methods: {
    setDough(value) {
      this.dough = value;
    },
    setDiameter(value) {
      this.diameter = value;
    },
    setSauces(value) {
      this.sauce = value;
    },
  },
};
</script>
