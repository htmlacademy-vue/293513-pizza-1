<template>
  <div class="main">
    <img class="loader" src="@/assets/img/product.svg" alt="pizza" />
  </div>
</template>

<script>
export default {
  name: "AppStartLoader",
};
</script>

<style lang="scss" scoped>
@keyframes load {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.loader {
  width: 300px;
  height: 300px;
  object-fit: contain;
  object-position: center;
  animation-name: load;
  animation-duration: 2000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
