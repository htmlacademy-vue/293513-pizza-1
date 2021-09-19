<template>
  <form class="layout-form" @submit.prevent="handleSubmit">
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

    <cart-modal v-if="isOpen" :close="handleClose" />
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartOrdersList from "@/modules/cart/components/CartOrdersList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartModal from "@/modules/cart/components/CartModal";

export default {
  name: "Cart",
  components: {
    CartFooter,
    CartForm,
    CartAdditionalList,
    CartOrdersList,
    CartModal,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState("Cart", {
      cart: "cart",
    }),
    ...mapState("Auth", ["isAuthenticated"]),

    isEmptyCart() {
      return !this.cart.length;
    },
  },
  methods: {
    ...mapActions("Addresses", ["getAddresses"]),
    ...mapActions("Cart", ["query"]),

    async handleSubmit() {
      await this.$store.dispatch("Cart/sendOrder");
      this.isOpen = true;
    },

    handleClose() {
      this.isOpen = false;
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getAddresses();
    }

    this.query();
  },
};
</script>
