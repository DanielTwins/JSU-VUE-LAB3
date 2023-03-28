<script setup>
import QuizForm from "../components/QuizForm.vue";
import UserAvatar from "../components/UserAvatar.vue";
</script>

<template>
  <div class="pt-medium">
    <UserAvatar />
    <div class="hero-text">
      <h1>Create your tailored quiz questions</h1>
      <h4>Write the questions and answer options to submit</h4>
    </div>
    <QuizForm />
  </div>
</template>

<style scoped></style>