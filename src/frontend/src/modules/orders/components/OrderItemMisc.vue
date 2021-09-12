<template>
  <li>
    <img :src="getMisc.image" width="20" height="30" :alt="getMisc.name" />

    <p>
      <span>{{ getMisc.name }}</span>
      <b>
        <span v-if="misc.quantity > 1">{{ misc.quantity }}x</span>
        <span>{{ getMisc.price }} ₽</span>
      </b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderItemMisc",
  props: {
    misc: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("Cart", {
      miscState: "misc",
    }),

    getMisc() {
      return this.miscState.find((it) => it.id === this.misc.miscId);
    },
  },
};
</script>
