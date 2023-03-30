<script setup>
import { RouterLink } from "vue-router";
import AppButton from "../components/AppButton.vue";
</script>

<template>
  <section class="card text-center">
    <div class="card-body">
      <!-- recive the props from HomePage -->
      <h5 class="card-title">{{ option.cardTitle }}</h5>
      <p class="card-text">{{ option.cardDescription }}</p>
      <!-- reuse custom button with custom properties -->
      <router-link :to="option.path">
        <AppButton color="primary" size="medium" padding="p-large"
          >{{ option.cardButton }}
        </AppButton>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    AppButton,
  },
  props: {
    option: Object,
  },
  /* props: {
    title: String,
    desc: String,
    btnLable: String,
  }, */
};
/* const props = defineProps({
  title: String,
  description: String,
}); */
</script>

<style>
.card-text {
  margin-bottom: 2rem;
}
</style>
