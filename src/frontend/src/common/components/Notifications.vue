<template>
  <ul class="container">
    <li
      class="notification"
      :class="{
        error: notification.type === 'error',
        success: notification.type === 'success',
        warning: notification.type === 'warning',
      }"
      v-for="notification in notifications"
      :key="notification.id"
    >
      {{ notification.text }}
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
@keyframes show {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 100;
  display: grid;
  grid-gap: 10px;
  max-width: 300px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.notification {
  padding: 8px;
  color: $white;
  background-color: $info;
  border-radius: 4px;
  animation-name: show;
  animation-duration: 250ms;
  animation-timing-function: ease;
}

.error {
  background-color: $red-800;
}

.success {
  background-color: $green-500;
}

.warning {
  background-color: $orange-100;
}
</style>
