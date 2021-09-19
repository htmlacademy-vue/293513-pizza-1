<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="orders.length">
      <order-item v-for="order of orders" :order="order" :key="order.id" />
    </template>

    <p v-else>Вы не сделали ещё ни одного заказа.</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderItem from "@/modules/orders/components/OrderItem";

export default {
  name: "Orders",
  components: { OrderItem },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  methods: {
    ...mapActions("Orders", ["getOrders"]),
    ...mapActions("Addresses", ["getAddresses"]),
  },
  mounted() {
    this.getOrders();
    this.getAddresses();
  },
};
</script>
