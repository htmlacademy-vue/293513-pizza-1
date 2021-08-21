<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ total }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/login" class="header__login" v-if="!isAuthenticated">
        <span>Войти</span>
      </router-link>

      <template v-else>
        <router-link to="/orders">
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          <span>{{ user.name }}</span>
        </router-link>

        <a href="#" class="header__logout" @click.prevent="$logout">
          <span>Выйти</span>
        </a>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppHeader",
  mixins: [logout],
  computed: {
    ...mapState("Auth", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", {
      total: "totalSum",
    }),
  },
};
</script>
