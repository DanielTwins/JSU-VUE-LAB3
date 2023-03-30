<template>
  <div class="progress-bar">
    <div v-for="i in quizToShow.questions.length" :key="i" :class="{ 'active': i === currentQuestion }"
      class="progress-bar__circle">
      {{ i }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quizToShow: {
      type: Object,
    },
    currentQuestion: {
      type: Number,
      required: true
    }
  },
  /*  nextQuestion: {
     type: Function,
     required: true
   } */
}
</script>

<style>
.progress-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: .5rem 0;
  margin: 1rem 0;
  width: 100%;
}

.progress-bar__circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* width: 2rem;
  height: 2rem; */
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 .2rem;
  font-size: .75rem;
  font-weight: bold;
  background-color: #eee;
  color: #333;
}

.progress-bar__circle.active {
  background-color: #007bff;
  color: #fff;
}
</style>
