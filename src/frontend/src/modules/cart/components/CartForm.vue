<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select class="select" v-model="delivery" data-test="cart-delivery">
          <option :value="1">Заберу сам</option>
          <option :value="2">Новый адрес</option>
          <template v-if="addresses.length">
            <option
              v-for="address in addresses"
              :key="address.id"
              :value="address.name"
            >
              {{ address.name }}
            </option>
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
          @input="setPhone(phone)"
          required
          data-test="cart-phone"
        />
      </label>

      <div
        class="cart-form__address"
        v-if="delivery !== 1"
        data-test="cart-address-form"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="address.street"
              type="text"
              name="street"
              @input="setAddress({ field: 'street', value: address.street })"
              :disabled="disabledInput"
              required
              data-test="cart-address-street"
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
              @input="
                setAddress({ field: 'building', value: address.building })
              "
              :disabled="disabledInput"
              required
              data-test="cart-address-house"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="address.flat"
              type="text"
              name="apartment"
              @input="setAddress({ field: 'flat', value: address.flat })"
              :disabled="disabledInput"
              data-test="cart-address-flat"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "CartForm",
  data() {
    return {
      delivery: 1,
      phone: "",
      address: {
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  computed: {
    ...mapState("Addresses", ["addresses"]),
    ...mapGetters("Addresses", ["getAddress"]),

    disabledInput() {
      return typeof this.delivery === "string";
    },
  },
  watch: {
    delivery() {
      if (typeof this.delivery === "string") {
        const address = this.getAddress(this.delivery);
        this.address.street = address.street;
        this.address.building = address.building;
        this.address.flat = address?.flat;

        this.addAddress(address);
      } else if (this.delivery === 2) {
        this.address.street = "";
        this.address.building = "";
        this.address.flat = "";

        this.addAddress({
          street: "",
          building: "",
          flat: "",
        });
      } else {
        this.address.street = "";
        this.address.building = "";
        this.address.flat = "";

        this.addAddress(null);
      }
    },
  },
  methods: {
    ...mapActions("Cart", ["addAddress", "setPhone", "setAddress"]),
  },
};
</script>
