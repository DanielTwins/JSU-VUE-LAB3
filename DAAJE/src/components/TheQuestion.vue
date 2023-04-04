<script setup>
const { question } = defineProps(["question"]);
const emit = defineEmits(["selectChoice", 'addToResult']);
const emitSelectedChoise = (isCorrect) => {
  emit("selectChoice", isCorrect);
};
const emitSelectedResult = (question, option) => {
  emit('addToResult', { question, option })
}
</script>

<template>
  <div class="question-container">
    <h3 class="question">
      {{ question.text }}
    </h3>
  </div>
  <div class="options-container">
    <div v-for="option in question.options" class="option"
      @click="emitSelectedChoise(option.isCorrect), emitSelectedResult(question, option)">
      <p class="option-label">{{ option.label }}</p>
      <div class="option-value">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  margin: 1rem 0;
}

.question {
  margin-bottom: 2rem;
  color: white;
}

.options-container {
  display: flex;
  flex-direction: column;
  color: white;
  gap: 2rem 0;
}

.option {
  display: flex;
  cursor: pointer;
  gap: 1rem;
  /* LA TILL */
  align-items: baseline;
  border: 1.5px solid white;
  border-radius: 40px;
  transition: background-color ease-in 200ms, transform ease-in 100ms;
}

.option:hover,
.option:focus{
    transform: translate(0, -3px);
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: #5f0a87  0px 4px 0 0;
    -webkit-box-shadow: #5f0a87  0px 4px 0 0;
    -moz-box-shadow: #5f0a87  0px 4px 0 0;
}

.option:active{
background-color: rgba(255, 255, 255, 0.6);
    transform: translate(0px, 2px);
    box-shadow: #5f0a87  0px 0px 0 0;
    -webkit-box-shadow: #5f0a87  0px 0px 0 0;
    -moz-box-shadow: #5f0a87  0px 0px 0 0;
}

.option-label {
  display: flex;

  /* UTKOMMENTERAD */
  /* align-items: center; */
  justify-content: center;

  background-image: linear-gradient(180deg, #5b6aac 0%, #5f0a87 84%);
  /* LA TILL */
  margin-top: .6rem;
  margin-left: .5rem;
  border-radius: 5rem;
  width: 2rem;
  height: 2rem;
}
</style>
