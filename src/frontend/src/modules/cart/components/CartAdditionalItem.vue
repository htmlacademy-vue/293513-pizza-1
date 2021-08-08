<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="additional.image"
        width="39"
        height="60"
        :alt="additional.name"
      />
      <span>{{ additional.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>

        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="additional.count"
          readonly
        />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>{{ additional.price }} ₽/шт.</b>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartAdditionalItem",
  props: {
    additional: {
      type: Object,
      required: true,
    },
  },
};
</script>
