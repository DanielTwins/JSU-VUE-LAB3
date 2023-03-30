import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import QuizPage from "../views/QuizPage.vue";
import QuizView from "../views/QuizView.vue";
import ResultsPage from "../views/ResultsPage.vue";
import CreateQuizPage from "../views/CreateQuizPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/quiz", component: QuizPage },
  { path: "/quiz/:id", component: QuizView },
  { path: "/results", component: ResultsPage },
  { path: "/create-quiz", component: CreateQuizPage },
];

export default routes;
