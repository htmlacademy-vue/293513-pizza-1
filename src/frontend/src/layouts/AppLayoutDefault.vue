<template>
  <div class="layout-wrapper">
    <app-header />

    <slot />
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
export default {
  name: "AppLayoutDefault",
  components: { AppHeader },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
