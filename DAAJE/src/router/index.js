import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import QuizPage from '../views/QuizPage.vue';
import QuizView from '../views/QuizView.vue';
import NotFound from '../views/NotFound.vue';
import ResultsPage from '../views/ResultsPage.vue';
import CreateQuizPage from '../views/CreateQuizPage.vue';

import { ref } from 'vue';
import axios from 'axios';
const result = await axios.get('http://localhost:8080/quiz_questions');
const quizes = ref(result.data);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  {
    path: '/quiz',
    name: 'QuizPage',
    component: QuizPage,
  },
  {
    path: '/quiz/:id',
    name: 'QuizView',
    props: (route) => ({ ...route.params, id: route.params.id }),
    beforeEnter(to, from) {
      const exists = quizes.value.find((quiz) => quiz.id === to.params.id);
      if (!exists) return {
          name: 'NotFound',
          // behåller url medans ny sidan renderas
          params: { pathMatch: to.path.split('/').slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    component: QuizView,
  },
  {
    path: '/results',
    name: 'ResultsPage',
    component: ResultsPage,
  },
  {
    path: '/create-quiz',
    name: 'CreateQuiz',
    component: CreateQuizPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;
