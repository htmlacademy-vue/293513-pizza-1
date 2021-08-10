<template>
  <ul class="cart-list sheet">
    <cart-order-item v-for="order in orders" :key="order.id" :order="order" />
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
