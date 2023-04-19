<!-- eslint-disable -->
<template>
  <div>
    <Suspense>
      <div class="wrapper">
        <section class="pt-medium">
          <!-- <UserAvatar :userName="userName" :userRole="userRole" /> -->
          <div class="hero-text">
            <h1>Here is all the results</h1>
            <h4>Pick one test occasion to see full results</h4>
          </div>
        </section>
        <main class="main-content">
          <div class="quiz-container">
            <section class="d-flex">
              <ResultCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
            </section>
          </div>
        </main></div
    ></Suspense>
  </div>
</template>

<!-- eslint-disable -->
<script>
import { ref } from 'vue';
import ResultCard from '../components/ResultCard.vue';
import axios from 'axios';
export default {
  async setup() {
    const userid = localStorage.getItem('usertoken');
    const result = await axios.get(
      userid
        ? `http://localhost:8080/quiz_questions/${userid}`
        : 'http://localhost:8080/quiz_questions'
    );
    const quizes = ref(result.data);
    return { quizes };
  },
  components: {
    ResultCard,
  },
};
</script>

<style>
.d-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quiz-container {
  display: flex;
  flex-direction: column;
}
</style>
