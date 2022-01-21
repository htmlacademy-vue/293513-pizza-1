<template>
  <form
    class="address-form address-form--opened sheet"
    data-test="add-address"
    @submit.prevent="$emit('submit', getAddress, resetForm)"
  >
    <div class="address-form__header">
      <b>Адрес №{{ getNumber }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>

          <input
            v-model="name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>

          <input
            v-model="street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>

          <input
            v-model="building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>

          <input
            v-model="flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </label>
      </div>

      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>

          <input
            v-model="comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        data-test="button-remove-address"
        @click="$emit('close', resetForm)"
      >
        Удалить
      </button>

      <button
        type="submit"
        class="button"
      >Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileForm",
  props: {
    address: {
      type: Object,
      defaults: {},
    },

    number: {
      type: Number,
    },
  },

  data() {
    return {
      name: this.address?.name || "",
      street: this.address?.street || "",
      building: this.address?.building || "",
      flat: this.address?.flat || "",
      comment: this.address?.comment || "",
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Auth", ["user"]),

    getNumber() {
      return this.number || this.addresses.length + 1;
    },

    getAddress() {
      const data = {
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };

      if (this.address) {
        data.id = this.address.id;
      }

      return data;
    },
  },

  methods: {
    ...mapActions("Addresses", ["addAddress"]),

    resetForm() {
      this.name = "";
      this.street = "";
      this.building = "";
      this.flat = "";
      this.comment = "";
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/address-form.scss";
</style>
