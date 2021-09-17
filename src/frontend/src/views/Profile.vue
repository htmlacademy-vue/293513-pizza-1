<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <profile-user />

    <div class="layout__address">
      <profile-address />
    </div>

    <div class="layout__address">
      <profile-form />
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";

export default {
  name: "Profile",
  components: { ProfileAddress, ProfileForm, ProfileUser },
};
</script>
