<template>
  <section>
    <div class="quiz-container" @click="goToQuiz">
      <div class="quiz-info">
        <img :src="quiz.img" alt="" />
        <div class="quiz-detail">
          <h3>{{ quiz.name }}</h3>
          <p>{{ quiz.questions.length }} st. frågor</p>
        </div>
      </div>

      <!-- <button @click="goToQuiz">Start Quiz!</button> -->
      <div class="mt-small">
        <AppButton @click="goToQuiz" width="" color="primary" size="small" padding="p-small">Start Quiz!
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import AppButton from "../components/AppButton.vue";

const { quiz } = defineProps(["quiz"]);
const router = useRouter();

const goToQuiz = () => {
  router.push(`/quiz/${quiz.id}`);
};
</script>

<style scoped>
.mt-small {
  margin-top: 5px;
}

.quiz-container {
  display: flex;
  flex-direction: row;
  background-color: aliceblue;
  border-radius: 6px;
  padding: 12px;
}

.quiz-info {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

img {
  width: 60px;
  height: auto;
}

.quiz-detail h3,
p {
  margin: 0;
}

.quiz-detail h3 {
  font-size: 20px;
  padding-bottom: 6px;
}
</style>
