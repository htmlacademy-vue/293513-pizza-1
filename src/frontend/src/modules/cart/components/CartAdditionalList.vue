<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <cart-additional-item
        v-for="additional in misc"
        :key="additional.id"
        :additional="additional"
      />
    </ul>
  </div>
</template>

<script>
import CartAdditionalItem from "@/modules/cart/components/CartAdditionalItem";
import { mapState } from "vuex";

export default {
  name: "CartAdditionalList",
  components: { CartAdditionalItem },
  computed: {
    ...mapState("Cart", ["misc"]),
  },
};
</script>
