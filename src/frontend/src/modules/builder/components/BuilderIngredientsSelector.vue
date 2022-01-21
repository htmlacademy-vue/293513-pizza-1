<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <app-radio-button
            v-for="sauceItem in sauces"
            :key="sauceItem.id"
            class="radio ingredients__input"
            name="sauce"
            :value="sauceItem.value"
            :checked="sauceItem.value === valueSauce"
            data-test="sauces-radio-button"
            @change="setSauce"
          >
            <span>{{ sauceItem.name }}</span>
          </app-radio-button>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <app-drag
                :draggable="ingredient.count < 3"
                :transfer-data="ingredient"
              >
                <app-selector-item :value="ingredient.value">
                  {{ ingredient.name }}
                </app-selector-item>
              </app-drag>

              <app-item-counter
                class="ingredients__counter"
                :value="ingredient.count"
                :min="0"
                :max="3"
                data-test="ingredient-counter"
                @input="
                  changeCountIngredient({
                    value: ingredient.value,
                    count: $event,
                  })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppSelectorItem from "@/common/components/AppSelectorItem";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    AppRadioButton,
    AppSelectorItem,
    AppItemCounter,
  },

  computed: {
    ...mapState("Builder", {
      sauces: "sauces",
      valueSauce: "sauce",
      ingredients: "ingredients",
    }),
  },

  methods: {
    ...mapActions("Builder", ["setSauce", "changeCountIngredient"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/ingredients.scss";
</style>
