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
          @change="setDough"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import RadioButton from "@/common/components/RadioButton";
import { SET_DOUGH } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", {
      doughList: "doughList",
      value: "dough",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      setDough: SET_DOUGH,
    }),
  },
};
</script>
