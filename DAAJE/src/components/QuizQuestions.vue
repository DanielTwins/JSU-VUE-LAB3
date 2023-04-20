<template>
  <section class="d-flex">
    <!-- <button style="border: 1px solid black">Knapp till Result</button> -->
    <!-- <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" /> -->
    <QuizCard
    v-for="quiz in quizes"
    :key="quiz.id"
    :quiz="quiz"
    />

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
    const userid = localStorage.getItem("usertoken");
    const result = await axios.get((userid? `http://localhost:8080/quiz_questions/${userid}` : "http://localhost:8080/quiz_questions"));
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
