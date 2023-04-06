<script setup>
import QuizCategoryComp from "../components/QuizCategoryComp.vue";
import UserAvatar from "../components/UserAvatar.vue";
</script>

<template>
  <div class="pt-medium">
    <UserAvatar />
    <div class="hero-text">
      <h1>Skapa ditt egna quiz utifrån kategorier!</h1>
      <h4>Välj kategorier och tryck skapa quiz för att få specifikt quiz.</h4>
    </div>
    <QuizCategoryComp />
  </div>
</template>

<style scoped></style>