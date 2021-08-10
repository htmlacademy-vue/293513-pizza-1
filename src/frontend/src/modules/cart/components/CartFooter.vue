<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>

    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>

    <div class="footer__price">
      <b>Итого: {{ totalSum }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="isOpen = true">
        Оформить заказ
      </button>
    </div>

    <cart-modal v-if="isOpen" :close="handleClose" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CartModal from "@/modules/cart/components/CartModal";

export default {
  name: "CartFooter",
  components: { CartModal },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["totalSum"]),
  },
  methods: {
    handleClose() {
      this.isOpen = false;
    },
  },
};
</script>
