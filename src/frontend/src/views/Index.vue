<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector />

        <builder-size-selector />

        <builder-ingredients-selector />

        <builder-pizza-view />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
  },
};
</script>
