<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <radio-button
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
          name="diameter"
          :value="size.value"
          :checked="size.value === value"
          @change="$emit('change', size.value)"
        >
          <span>{{ size.name }}</span>
        </radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
