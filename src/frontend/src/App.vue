<template>
  <div id="app">
    <app-layout v-if="!isLoading">
      <router-view />
    </app-layout>

    <app-start-loader v-else />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppStartLoader from "@/common/components/AppStartLoader";

export default {
  name: "App",
  components: { AppStartLoader, AppLayout },
  created() {
    this.$store.dispatch("init");
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
</style>
