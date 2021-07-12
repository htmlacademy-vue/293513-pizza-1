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
                <label
                  class="dough__input"
                  :class="`dough__input--${doughItem.value}`"
                  v-for="doughItem in doughList"
                  :key="doughItem.id"
                >
                  <input
                    type="radio"
                    name="dough"
                    :value="doughItem.value"
                    class="visually-hidden"
                    v-model="dough"
                  />
                  <b>{{ doughItem.name }}</b>
                  <span>{{ doughItem.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  class="diameter__input"
                  :class="{
                    ['diameter__input--small']: size.multiplier === 1,
                    ['diameter__input--normal']: size.multiplier === 2,
                    ['diameter__input--big']: size.multiplier === 3,
                  }"
                  v-for="size in sizes"
                  :key="size.id"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="size.value"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
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

                  <label
                    class="radio ingredients__input"
                    v-for="sauce in sauces"
                    :key="sauce.id"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.value"
                      checked
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                    >
                      <span
                        class="filling"
                        :class="'filling--' + ingredient.value"
                        >{{ ingredient.name }}</span
                      >
                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
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
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

export default {
  name: "IndexHome",
  data() {
    return {
      misc,
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeIngredient(ingredient)
      ),
      doughList: pizza.dough.map((dough) => normalizeDough(dough)),
      dough: "light",
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      user,
    };
  },
};
</script>
