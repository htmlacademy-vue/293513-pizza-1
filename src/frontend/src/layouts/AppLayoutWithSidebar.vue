<template>
  <div>
    <app-header />

    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          class="layout__link"
          :class="{ 'layout__link--active': $route.name === 'Orders' }"
          to="/orders"
        >
          История заказов
        </router-link>
        <router-link
          class="layout__link"
          :class="{ 'layout__link--active': $route.name === 'Profile' }"
          to="/profile"
        >
          Мои данные
        </router-link>
      </div>

      <slot />
    </main>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";

export default {
  name: "AppLayoutWithSidebar",
  components: { AppHeader },
};
</script>
