<template>
  <div class="layout__address">
    <div
      v-if="!isEdit"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ number }}. {{ address.name }}</b>

        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="button-edit-address"
            @click="handleOpenEdit"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>

      <p>
        {{ address.street }}, д. {{ address.building }}
        <template v-if="address.flat">
          <span data-test="address-flat">, оф. {{ address.flat }}</span>
        </template>
      </p>
      <small
        v-if="address.comment"
        data-test="address-comment"
      >
        {{ address.comment }}
      </small>
    </div>

    <profile-form
      v-else
      :address="address"
      :number="number"
      data-test="edit-address-form"
      @close="handleClose"
      @submit="handleEditAddress"
    />
  </div>
</template>

<script>
import ProfileForm from "@/modules/profile/components/ProfileForm";
import { mapActions } from "vuex";

export default {
  name: "ProfileAddress",
  components: { ProfileForm },
  props: {
    address: {
      type: Object,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isEdit: false,
    };
  },

  methods: {
    ...mapActions("Addresses", ["deleteAddress", "editAddress"]),

    handleOpenEdit() {
      this.isEdit = true;
    },

    handleClose(callback) {
      this.deleteAddress(this.address);
      callback();
      this.isEdit = false;
    },

    handleEditAddress(address, callback) {
      this.editAddress(address);
      callback();
      this.isEdit = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/address-form.scss";
</style>
