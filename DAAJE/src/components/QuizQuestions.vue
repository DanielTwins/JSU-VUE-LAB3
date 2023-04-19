<template>
  <section class="d-flex">
    <!-- <button style="border: 1px solid black">Knapp till Result</button> -->
    <!-- <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" /> -->
    <ResultCard
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
import ResultCard from "./ResultCard.vue";

export default {
  components: { ResultCard },
  async setup() {
    const userid = localStorage.getItem("usertoken");
    const result = await axios.get((userid? `http://localhost:8080/quiz_questions/${userid}` : "http://localhost:8080/quiz_questions"));
    const quizes = ref(result.data);
      return { quizes };
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
