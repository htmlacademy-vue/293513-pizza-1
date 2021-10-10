<template>
  <div id="app">
    <app-layout v-if="!isLoading">
      <transition name="slide" mode="out-in" appear>
        <router-view />
      </transition>
    </app-layout>

    <app-start-loader v-else />

    <notifications />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppStartLoader from "@/common/components/AppStartLoader";
import Notifications from "@/common/components/Notifications";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: { Notifications, AppStartLoader, AppLayout },
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
    this.$store.dispatch("Cart/getMisc");
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.slide-enter-active,
.slide-leave-active {
  transition-duration: 500ms;
  transition-property: height, opacity, transform;
  transition-timing-function: ease;
}

.slide-enter {
  opacity: 0;
  transform: translate(50px, 0);
}

.slide-leave-active {
  opacity: 0;
  transform: translate(-50px, 0);
}
</style>
