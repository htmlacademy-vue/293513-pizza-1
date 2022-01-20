<template>
  <div class="container">
    <div class="sign-form">
      <a
        href="#"
        class="close close--white"
        @click.prevent="$router.back"
        data-test="btn-close"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>

      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>

      <form @submit.prevent="login">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              ref="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="example@mail.ru"
              required
              data-test="input-email"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              v-model="password"
              type="password"
              name="pass"
              placeholder="***********"
              required
              data-test="input-password"
            />
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",
  middlewares: [isLoggedIn],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });

      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  & > div {
    position: static;
    transform: none;
  }
}
</style>
