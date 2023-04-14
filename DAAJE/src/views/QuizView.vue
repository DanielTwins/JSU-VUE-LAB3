<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import axios from "axios";
import { useResultStore } from "../stores/ResultStore";
import Confetti from "../components/Confetti.vue";
import TheQuestion from "../components/TheQuestion.vue";
import TheResults from "../components/TheResults.vue";
import ProgressBar from "../components/ProgressBar.vue";
import TimerComponent from "../components/TimerComponent.vue";

const currentQuestionIndex = ref(0);
const sumOfCorrectAnswers = ref(0);
const studentId = ref(0);
const showResults = ref(false);

const route = useRoute();
const paramsId = route.params.id;

const resultStore = useResultStore();

// empty resultStore for new quiz
resultStore.$reset();

const userid = localStorage.getItem("usertoken");
const result = await axios.get(`http://localhost:8080/quiz_questions/${userid}`);
const quizes = ref(result.data);

const quizToShow = quizes.value.find((quiz) => quiz.id === paramsId);
const quizStatus = computed(
  () => `${currentQuestionIndex.value}/${quizToShow.questions.length}`,
);
const completionPercentage = computed(
  () => `${(currentQuestionIndex.value / quizToShow.questions.length) * 100}%`,
);

const onChoiceSelected = async (isCorrect) => {
  if (isCorrect) {
    sumOfCorrectAnswers.value++;
  }

  if (quizToShow.questions.length - 1 === currentQuestionIndex.value) {
    showResults.value = true;

    // POST to backend
    // prepare all questions from resultStore.results
    // to store in resultData for backend POST
    //                 ** Await necessary when communicating with the store and sending data.
    //                 Incomplete objects were being sent!! **
    const resultData = await resultStore.results;
                                                            //the _id of the taken quiz should be included here to track results for individual quizes
    axios.post(`http://localhost:8080/post/result/${userid}?takenQuizId=`, {
      resultData,
    })
      .then((response) => {
        console.log(response);
        resultStore.addResultSum({ response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  currentQuestionIndex.value++;
};
</script>

<template>
  <div class="wrapper">
    <div class="hero-section">
      <h1>Vue.js Quiz</h1>
      <TimerComponent />
    </div>
    <main class="main-content">
      <ProgressBar :currentQuestion="currentQuestionIndex + 1" :quizToShow="quizToShow" />
      <div>
        <TheQuestion v-if="!showResults" :question="quizToShow.questions[currentQuestionIndex]"
          @selectChoice="onChoiceSelected" @addToResult="resultStore.addResult($event, { question, choice })" />

        <TheResults v-else :studentId="studentId" :quizLength="quizToShow.questions.length"
          :sumOfCorrectAnswers="sumOfCorrectAnswers" />
        <Confetti v-if="showResults" :sumOfCorrectAnswers="sumOfCorrectAnswers"/>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {
    ProgressBar,
    TimerComponent,
  },
  data() {
    return {
      currentQuestion: 1,
      userName: "Richard",
      userRole: "JavaScript Educator",
    };
  },
};
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem .5rem;
  color: #d9d7d7;
}
</style>
