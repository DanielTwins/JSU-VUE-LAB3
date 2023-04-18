<template>
  <section class="d-flex">
    <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
    <hr />
    <QuizCard v-for="quiz in showCustomQuizFromElis" :key="quiz.id" :quiz="quiz" />
  </section>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import QuizCard from "./QuizCard.vue";

export default {
  components: { QuizCard },
  async setup() {
    const userid = localStorage.getItem("usertoken");
    const result = await axios.get((userid? `http://localhost:8080/quiz_questions/${userid}` : "http://localhost:8080/quiz_questions"));
    const quizes = ref(result.data);

    // add new list of custom quizzes from another user
    const getCustomQuizFromElis = await axios.get(("http://localhost:8080/quiz_questions/643d4871958ac15c967dd034"));

    // använder slize för att endast få den sista frågan med.
    // för att undvika dem 3 första vanliga som redan finns.
    const showCustomQuizFromElis = ref(getCustomQuizFromElis.data.slice(5));

    // konsol loggar för att se att dem verkar identiska
    console.log(showCustomQuizFromElis);
    console.log(quizes);
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
