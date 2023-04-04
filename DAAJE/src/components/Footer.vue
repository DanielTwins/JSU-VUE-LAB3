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
  color: aliceblue;
  margin: 0 -20px;
}
</style>
