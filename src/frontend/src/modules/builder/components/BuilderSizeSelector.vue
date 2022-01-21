<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <app-radio-button
          v-for="size in sortedSizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
          name="diameter"
          :value="size.value"
          :checked="size.value === value"
          @change="setSize"
          data-test="builder-size-pizza"
        >
          <span>{{ size.name }}</span>
        </app-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppRadioButton,
  },
  computed: {
    ...mapState("Builder", {
      sizes: "sizes",
      value: "size",
    }),

    sortedSizes() {
      const clone = [...this.sizes];

      clone.sort((a, b) => {
        return a.multiplier - b.multiplier;
      });

      return clone;
    },
  },
  methods: {
    ...mapActions("Builder", ["setSize"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/diameter.scss";
</style>
