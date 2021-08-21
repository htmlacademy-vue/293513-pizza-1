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
        <label class="input" :class="{ error: validations.email.error }">
          <span>E-mail</span>
          <input
            ref="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
          <span class="error__text" v-if="validations.email.error">
            {{ validations.email.error }}
          </span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input" :class="{ error: validations.password.error }">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
          <span class="error__text" v-if="validations.password.error">
            {{ validations.password.error }}
          </span>
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { validator } from "@/common/mixins";

export default {
  name: "Login",
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      const isValid = this.$validateFields(
        {
          email: this.email,
          password: this.password,
        },
        this.validations
      );

      if (!isValid) {
        return;
      }

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
.error {
  input {
    border-color: $red-800;
  }
}

.error__text {
  color: $red-800;
}
</style>
