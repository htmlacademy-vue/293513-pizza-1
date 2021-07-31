<template>
  <div>
    <app-header />

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
export default {
  name: "AppLayoutDefault",
  components: { AppHeader },
};
</script>
