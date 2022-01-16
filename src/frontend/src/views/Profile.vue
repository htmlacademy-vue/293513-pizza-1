<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <profile-user />

    <profile-address
      :address="address"
      v-for="(address, index) in addresses"
      :key="address.id"
      :number="index + 1"
    />

    <div class="layout__address" v-if="isAddNewAddress">
      <profile-form @close="handleCloseForm" @submit="handleAddAddress" />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="handleOpenForm"
        :disabled="isAddNewAddress"
        data-test="button-new-address"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  components: { ProfileAddress, ProfileForm, ProfileUser },
  data() {
    return {
      isAddNewAddress: false,
    };
  },
  computed: {
    ...mapState("Addresses", ["addresses"]),
  },
  methods: {
    ...mapActions("Addresses", ["getAddresses", "addAddress"]),

    handleOpenForm() {
      this.isAddNewAddress = true;
    },

    handleAddAddress(address, callback) {
      this.addAddress(address);
      callback();
      this.isAddNewAddress = false;
    },

    handleCloseForm(callback) {
      callback();
      this.isAddNewAddress = false;
    },
  },
  mounted() {
    this.getAddresses();
  },
};
</script>
