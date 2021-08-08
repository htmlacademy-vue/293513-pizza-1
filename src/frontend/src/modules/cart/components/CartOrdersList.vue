<template>
  <ul class="cart-list sheet">
    <cart-order-item
      v-for="(order, index) in orders"
      :key="index"
      :order="order"
    />
  </ul>
</template>

<script>
import CartOrderItem from "@/modules/cart/components/CartOrderItem";
import { mapState } from "vuex";

export default {
  name: "CartOrdersList",
  components: { CartOrderItem },
  computed: {
    ...mapState("Cart", {
      orders: "cart",
    }),
  },
};
</script>
