<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
<template>
  <div class="container">
    <Navbar />
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
    <Footer />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style scoped>
.container {
  padding: 0 1.3rem;

  background-color: #a4508b;
  background-image: linear-gradient(286deg, #a4508b 0%, #5f0a87 84%);
}
</style>
