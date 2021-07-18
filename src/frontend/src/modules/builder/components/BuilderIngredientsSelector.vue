<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <radio-button
            class="radio ingredients__input"
            name="sauce"
            v-for="sauceItem in sauces"
            :key="sauceItem.id"
            :value="sauceItem.value"
            :checked="sauceItem.value === valueSauce"
            @change="$emit('changeSauce', sauceItem.value)"
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
              <app-drag
                :draggable="ingredient.count < 3"
                :transfer-data="ingredient"
              >
                <selector-item :value="ingredient.value">
                  {{ ingredient.name }}
                </selector-item>
              </app-drag>

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
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    RadioButton,
    SelectorItem,
    ItemCounter,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    valueSauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>
