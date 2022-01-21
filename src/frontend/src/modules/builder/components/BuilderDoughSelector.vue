<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <app-radio-button
          v-for="dough in doughList"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          name="dough"
          :value="dough.value"
          :checked="dough.value === value"
          data-test="dough-radio-button"
          @change="setDough"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </app-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    AppRadioButton,
  },

  computed: {
    ...mapState("Builder", {
      doughList: "doughList",
      value: "dough",
    }),
  },

  methods: {
    ...mapActions("Builder", ["setDough"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/dough.scss";
</style>
