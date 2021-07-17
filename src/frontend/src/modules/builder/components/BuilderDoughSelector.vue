<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          v-for="dough in doughList"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          name="dough"
          :value="dough.value"
          :checked="dough.value === value"
          @change="$emit('change', dough.value)"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  components: {
    RadioButton,
  },
  props: {
    doughList: {
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
