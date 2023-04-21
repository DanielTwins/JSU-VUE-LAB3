<template>
  <section class="d-flex">
    <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
     <hr />
     <QuizCard v-for="quiz in showCustomQuizFromElis" :key="quiz.id" :quiz="quiz" />
  </section>
</template>

<script>
import axios from "axios";

// import QuizCard from "./QuizCard.vue";
import { ref } from "vue";
import QuizCard from "./QuizCard.vue";

export default {
  components: { QuizCard },
  async setup() {
    const usertoken = JSON.parse(localStorage.getItem("usertoken"));
    const result = await axios.get((usertoken? `http://localhost:8080/quiz_questions/${usertoken.id}` : "http://localhost:8080/quiz_questions"));
    const quizes = ref(result.data);
    const ouid = "6438362cf7eacfc8b8a276d1";// sample
    const quizId = "643872d185dd4fbabfa27d8b";// sample
    // add new list of custom quizzes from another user
    const getCustomQuizFromElis = await axios.get((`http://localhost:8080/shared_quiz_questions/${ouid}/${quizId}`));

    const showCustomQuizFromElis = ref(getCustomQuizFromElis.data);

    return { quizes, showCustomQuizFromElis };
  },
};
</script>
<style scoped>
.d-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;

}
</style>
