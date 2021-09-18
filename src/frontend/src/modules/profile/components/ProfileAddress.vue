<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №{{ address.id }}. {{ address.name }}</b>

      <div class="address-form__edit">
        <button type="button" class="icon">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <p>
      {{ address.street }}, д. {{ address.building }}
      <template v-if="address.flat"> , оф. {{ address.flat }} </template>
    </p>
    <small v-if="address.comment">{{ address.comment }}</small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>
