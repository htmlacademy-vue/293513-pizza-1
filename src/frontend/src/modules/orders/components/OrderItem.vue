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
        <button type="button" class="button button--border">Удалить</button>
      </div>

      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <order-item-pizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional" v-if="order.orderMisc">
      <order-item-misc
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :misc="misc"
      />
    </ul>

    <p class="order__address" v-if="order.addressId">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
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

    totalSum() {
      const sumPizza = this.order.orderPizzas.reduce((acc, item) => {
        acc += this.sumPricePizza(item) * item.quantity;
        return acc;
      }, 0);
      const sumMisc = this.sumPriceMisc(this.order?.orderMisc);

      return sumPizza + sumMisc;
    },
  },
};
</script>
