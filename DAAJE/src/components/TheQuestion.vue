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
}

.option-label {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, #5b6aac 0%, #5f0a87 84%);
  border-radius: 5rem;
  width: 2rem;
  height: 2rem;
}

.option-value {
  border-radius: 5rem;
  color: white;
  width: 100%;
  padding: 0 1rem;
}
</style>
