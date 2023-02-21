import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import QuizPage from "../views/QuizPage.vue";
import ResultsPage from "../views/ResultsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/quiz", component: QuizPage },
  { path: "/results", component: ResultsPage },
];

export default routes;
