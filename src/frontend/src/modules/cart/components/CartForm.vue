<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="delivery">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <template v-if="addresses.length">
            <option value="3">Дом</option>
          </template>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="phone"
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          @input="handleSetPhone"
          required
        />
      </label>

      <div class="cart-form__address" v-if="delivery !== '1'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="address.street"
              type="text"
              name="street"
              required
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="address.building"
              type="text"
              name="house"
              required
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input v-model="address.flat" type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { SET_PHONE } from "@/store/mutations-types";

export default {
  name: "CartForm",
  data() {
    return {
      delivery: "1",
      phone: "",
      address: {
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  computed: {
    ...mapState("Auth", ["addresses"]),
  },
  methods: {
    ...mapMutations("Cart", {
      setPhone: SET_PHONE,
    }),

    handleSetPhone() {
      this.setPhone(this.phone);
    },
  },
};
</script>
