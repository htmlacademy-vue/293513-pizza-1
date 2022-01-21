<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div
      class="backdrop"
      @click="handleClose"
    >
      <div
        class="popup"
        @click.stop
      >
        <button
          class="close btn-close"
          @click="handleClose"
        >
          <span class="visually-hidden">Закрыть попап</span>
        </button>

        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>

        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>

        <div class="popup__button">
          <a
            href="#"
            class="button"
            data-test="cart-ready"
            @click.prevent="handleClose"
          >
            Отлично, я жду!
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CartModal",
  props: {
    close: {
      type: Function,
      required: true,
    },
  },

  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },

  methods: {
    ...mapActions("Cart", ["resetCart"]),

    handleClose() {
      this.close();

      setTimeout(() => {
        if (this.isAuthenticated) {
          this.$router.push({ name: "Orders" });
        } else {
          this.$router.push("/");
        }

        this.resetCart();
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-close {
  background-color: transparent;
  border: none;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
