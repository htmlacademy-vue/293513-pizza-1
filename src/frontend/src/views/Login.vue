<template>
  <div class="sign-form">
    <a href="#" class="close close--white" @click.prevent="$router.back">
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
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
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
