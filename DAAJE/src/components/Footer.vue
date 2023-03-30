<template>
  <footer>
    <p>&copy; Made by DAAJE {{ currentYear }}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: null,
    };
  },
  created() {
    this.currentYear = new Date().getFullYear();
  },
};
</script>
<style>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 80px;
  background-color: #a4508b;
  background-image: linear-gradient(286deg, #a4508b 0%, #5f0a87 84%);
  color: aliceblue;
  margin: 0 -20px;
}
</style>
