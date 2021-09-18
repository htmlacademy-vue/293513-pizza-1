<template>
  <form
    @submit.prevent="$emit('submit', handleAddAddress)"
    class="address-form address-form--opened sheet"
  >
    <div class="address-form__header">
      <b>Адрес №{{ addresses.length + 1 }}</b>
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
        @click="$emit('close', resetForm)"
      >
        Удалить
      </button>

      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileForm",
  data() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },
  computed: {
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Auth", ["user"]),
  },
  methods: {
    ...mapActions("Addresses", ["addAddress"]),

    handleAddAddress() {
      this.addAddress({
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      });

      this.resetForm();
    },

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
