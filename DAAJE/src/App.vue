<script setup>
import TheNavbar from "./components/TheNavbar.vue";
import Footer from "./components/Footer.vue";
</script>
<template>
  <div class="container">
    <TheNavbar />
    <Suspense>
      <RouterView v-slot="{Component}">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </Transition>
      </RouterView>
    </Suspense>
    <Footer />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    TheNavbar,
  },
};
</script>
<style scoped>
.container {
  padding: 0 1.3rem;

  background-color: #a4508b;
  background-image: linear-gradient(286deg, #a4508b 0%, #5f0a87 84%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
