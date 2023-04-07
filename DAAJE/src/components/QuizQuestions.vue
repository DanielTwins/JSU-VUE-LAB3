<template>
  <section class="d-flex">
    <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
  </section>
</template>

<script>
import axios from "axios";
import QuizCard from "./QuizCard.vue";
import { ref } from "vue";

export default {
  components: { QuizCard },
  async setup() {
                                                                // provide user id as last parameter to retrieve custom quizes
    const result = await axios.get("http://localhost:8080/quiz_questions/642d7db25ca37827d36cb3e9");
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
