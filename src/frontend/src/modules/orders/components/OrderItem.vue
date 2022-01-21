<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ totalSum }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          data-test="button-remove-order"
          @click="removeOrder(order)"
        >
          Удалить
        </button>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="button-repeat-order"
          @click="handleRepeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <order-item-pizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul
      v-if="order.orderMisc"
      class="order__additional"
    >
      <order-item-misc
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :misc="misc"
      />
    </ul>

    <p
      v-if="order.addressId"
      class="order__address"
    >
      Адрес доставки: {{ order.orderAddress.name }}
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import OrderItemPizza from "@/modules/orders/components/OrderItemPizza";
import OrderItemMisc from "@/modules/orders/components/OrderItemMisc";

export default {
  name: "OrderItem",
  components: { OrderItemMisc, OrderItemPizza },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["sumPricePizza", "sumPriceMisc"]),
    ...mapState("Builder", ["doughList", "sauces", "sizes", "ingredients"]),
    ...mapState("Cart", ["misc"]),
    ...mapState("Addresses", ["addresses"]),

    totalSum() {
      const sumPizza = this.order.orderPizzas.reduce((acc, item) => {
        acc += this.sumPricePizza(item) * item.quantity;
        return acc;
      }, 0);
      const sumMisc = this.sumPriceMisc(this.order.orderMisc);

      return sumPizza + sumMisc;
    },
  },

  methods: {
    ...mapActions("Cart", ["repeatOrder"]),
    ...mapActions("Orders", ["removeOrder"]),

    handleRepeatOrder() {
      const pizzasOrder = this.order.orderPizzas.map((item) => {
        const dough = this.doughList.find((it) => it.id === item.doughId);
        const sauce = this.sauces.find((it) => it.id === item.sauceId);
        const size = this.sizes.find((it) => it.id === item.sizeId);
        const ingredients = item.ingredients.map((it) => {
          const ingredient = this.ingredients.find(
            (el) => el.id === it.ingredientId
          );

          return {
            ...ingredient,
            count: it.quantity,
          };
        });

        return {
          id: `${Date.now()}-${Math.random()}`,
          name: item.name,
          dough: dough.value,
          sauce: sauce.value,
          size: size.value,
          price: this.sumPricePizza(item),
          quantity: item.quantity,
          ingredients,
        };
      });

      const miscOrder = this.misc.map((item) => {
        const misc = this.order?.orderMisc?.find((it) => it.miscId === item.id);

        if (misc) {
          return {
            ...item,
            quantity: misc.quantity,
          };
        }

        return { ...item };
      });

      this.repeatOrder({
        cart: pizzasOrder,
        misc: miscOrder,
      });

      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/order.scss";
</style>
