<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isEmptyCart" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <cart-orders-list />

          <cart-additional-list />

          <cart-form />
        </template>
      </div>
    </main>

    <cart-footer v-if="!isEmptyCart" />
  </form>
</template>

<script>
import { mapState } from "vuex";
import CartOrdersList from "@/modules/cart/components/CartOrdersList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";

export default {
  name: "Cart",
  components: { CartFooter, CartForm, CartAdditionalList, CartOrdersList },
  computed: {
    ...mapState("Cart", {
      cart: "cart",
    }),

    isEmptyCart() {
      return !this.cart.length;
    },
  },
};
</script>
