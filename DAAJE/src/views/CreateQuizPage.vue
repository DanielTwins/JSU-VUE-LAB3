<script setup>
import QuizForm from "../components/QuizForm.vue";
import UserAvatar from "../components/UserAvatar.vue";
</script>

<template>
  <div class="pt-medium">
    <UserAvatar
      :img="imgPath"
      :userGreeting="userGreeting"
      :userDesc="userDesc"
    />
    <div class="hero-text">
      <h1>Create your tailored quiz questions</h1>
      <h4>Write the questions and answer options to submit</h4>
    </div>
    <QuizForm />
  </div>
</template>

<style scoped>

.pt-medium {
    padding-top: 20px;
  }
  .hero-text {
  padding: 3rem 0.3rem;
  color: #d9d7d7;
}

  </style>