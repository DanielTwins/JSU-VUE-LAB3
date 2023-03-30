<script setup>
import HomeCard from "../components/HomeCard.vue";
import UserAvatar from "../components/UserAvatar.vue";
</script>

<template>
  <div class="row">
    <div class="col">
      <UserAvatar :img="imgPath" :userGreeting="userGreeting" :userDesc="userDesc" />
      <div class="hero-text">
        <h1>Welcome to your favorite Quiz App</h1>
        <h4>Increase your students performance!</h4>
      </div>
      <main class="main-content">
        <div class="card-wrapper">
          <HomeCard v-for="(option, index) in options" :key="index" :option="option" />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    UserAvatar,
    HomeCard,
  },
  data() {
    return {
      options: [
        {
          cardTitle: "Start a Quiz",
          cardDescription: "Use a previous created Quiz",
          cardButton: "Action",
          path: "/quiz",
        },
        {
          cardTitle: "Create questions",
          cardDescription: "Create tailored questions for a course",
          cardButton: "Action",
          path: "/create-quiz",
        },
        {
          cardTitle: "Review prior results",
          cardDescription: "Review students previous results",
          cardButton: "Action",
          path: "/quiz",
        },
      ],
      imgPath: "",
      userGreeting: "Hello, Richard",
      userDesc: "JavaScript Educator",
    };
  },
};
</script>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
