<!-- eslint-disable -->
<template>
  <section>
    <div class="quiz-wrapper">
      <div class="quiz-top-container">
        <div class="quiz-header-container">
          <div class="quiz-img-container">
            <img :src="quiz.img" alt="" />
          </div>
          <p class="quiz-header">{{ quiz.name }}</p>
          <p class="quiz-class-info-item">{{ classInfo }}</p>
          <p class="quiz-date">{{ dateOfQuiz }}</p>
        </div>
        <div class="quiz-detail">
          <div class="quiz-class-result-info-item">
            <span>{{ classResult }}%</span> correct
          </div>
        </div>
      </div>
      <div class="quiz-container">
        <div class="quiz-info">
          <div class="quiz-class-info-container">
            <p class="question-info">
              {{ quiz.questions.length }}
              {{ quiz.questions.length > 1 ? 'questions' : 'question' }}
            </p>

            <ul class="question-category-container">
              <li
                v-for="category in quizCategory"
                key="category.id"
                class="question-category-item"
              >
                {{ category.category }}
              </li>
            </ul>
          </div>
          <button @click="toQuizResults" class="start-question-btn">
            See full result
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<!-- eslint-disable -->
<script setup>
import { useRouter } from 'vue-router';
import QuizCategoryComp from './QuizCategoryComp.vue';

// FÅR INFORMATION HÄRIFRÅN
const { quiz } = defineProps(['quiz']);
const router = useRouter();

// Tar en till Results
const toQuizResults = () => {
  router.push(`/results`);
};
const goToQuiz = () => {
  router.push(`/quiz/${quiz.id}`);
};
</script>
<!-- eslint-disable -->
<script>
export default {
  data() {
    return {
      classResult: 95,
      dateOfQuiz: '18/4 2023',
      classInfo: 'JSU22',
      quizCategory: [
        {
          id: 1,
          category: 'Vuex',
        },
        {
          id: 2,
          category: 'VueRouter',
        },
        {
          id: 3,
          category: 'Props',
        },
        {
          id: 4,
          category: 'Components',
        },
      ],
    };
  },
  //   props:{
  //         classResult : this.classResult,
  //         dateOfQuiz : this.dateOfQuiz,
  //         classInfo : this.classInfo,
  //         quizCategory : this.quizCategory
  //     },
  methods: {
    createQuizFromCategory() {
      console.log('Create quiz from category');
      // ROUTE
    },
  },
};
</script>
<!-- eslint-disable -->
<style scoped>
h6,
p,
ul {
  line-height: 17px;
  margin: 0 !important;
  padding: 0 !important;
}

.quiz-wrapper {
  border-radius: 12px;
  background-color: aliceblue;
  display: grid;
  margin-bottom: 1rem;
}

.quiz-top-container {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.2rem;
  border-bottom: 1px solid var(--purple);
}

.quiz-header-container {
  margin: 0.3rem;
  display: flex;
  justify-content: start;
  gap: 0.2rem;
  flex-wrap: wrap;
}

@media (min-width: 530px) {
  .quiz-header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}

.quiz-detail {
  padding: 0.3rem;
}

.quiz-class-result-info-item {
  text-align: right;
  margin: 0;
}
.quiz-class-result-info-item span {
  font-weight: bold;
}

@media (min-width: 530px) {
  .quiz-detail {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .quiz-class-result-info-item {
    text-align: left;
  }
}

.start-question-btn {
  color: var(--white);
  background-image: var(--quiz-gradient);
  cursor: pointer;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
}
.quiz-container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.quiz-info {
  gap: 0.6rem;
  display: flex;
  justify-content: space-between;
}

.quiz-header {
  font-weight: bold;
}

.question-info {
  font-size: 16px;
}

.question-info span {
  font-weight: bold;
}

.quiz-img-container {
  max-width: 30px;
}

img {
  width: 100%;
  height: auto;
}

.question-category-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0.5rem 0;
  padding: 0.1rem;
}

.question-category-item {
  font-style: italic;
  list-style: none;
  border-right: 1px solid var(--purple);
  padding: 0 0.3rem 0 0;
}
.question-category-item:last-child {
  border-right: none;
}
</style>
