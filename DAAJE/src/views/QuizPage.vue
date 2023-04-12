<script setup>
// import UserAvatar from "../components/UserAvatar.vue";
import QuizQuestions from "../components/QuizQuestions.vue";

// const props = defineProps({
//   userName: String,
//   userRole: String
// })
</script>

<template>
  <div>

  <Suspense>
    <div class="wrapper">
      <section class="pt-medium">
        <!-- <UserAvatar :userName="userName" :userRole="userRole" /> -->
        <div class="hero-text">
          <h1>Welcome to your favorite Quiz App</h1>
          <h4>Select a category to start the quiz!</h4>
        </div>
      </section>
      <main class="main-content">
        <div class="quiz-container">
          <QuizQuestions />
          <!-- created a specific page instead, the card "Create Quiz" on homepage navigates to the page  -->
          <!-- <QuizForm /> -->
        </div>
      </main>
    </div>
  </Suspense>
</div>

</template>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
}
</style>
