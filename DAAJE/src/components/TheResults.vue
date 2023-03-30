<script>
import Chart from 'chart.js/auto'
import { useResultStore } from '../stores/resultStore'

export default {
    name: 'TheResults',
    props: {
        quizLength: Number,
        sumOfCorrectAnswers: Number,
        studentId: Number,
        teacher: Boolean
    },
    setup() {
        const resultStore = useResultStore()

        const question = resultStore.results.question
        const answers = resultStore.results.option
        const results = resultStore.results

        return { question, answers, results }
    },
    data() {
        return {
            welcomeMessage: '',
            fetchedResultData: [],
        }
    },
    methods: {},
    mounted() {
        const ctx = document.getElementById('myChart');
        const MyChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Rätt svar", "Fel svar"],
                datasets: [
                    {
                        label: "Resultat av Quiz",
                        data: [this.sumOfCorrectAnswers, (this.quizLength - this.sumOfCorrectAnswers)],
                        // backgroundColor: "rgba(54,73,93,.5)",
                        // borderColor: "#36495d",
                        borderWidth: 3,
                    },
                ],
            },
        })
        MyChart;
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <h3>Resultat av ditt quiz!</h3>
                <canvas id="myChart"></canvas>
                <h3 class="mb-3">Enskilda resultat av frågor:</h3>
                <div v-for="(result, index) in results">
                    <h5>Fråga {{ index + 1 }}, {{ result.question.text }}</h5>
                    <p>
                        Rätt svar:
                        {{
                            result.question.options.filter(
                                (option) => option.isCorrect === true
                            )[0].label
                        }},
                        {{
                            result.question.options.filter(
                                (option) => option.isCorrect === true
                            )[0].text
                        }}
                    </p>
                    <p class="pb-3" :style="{
                        color: result.option.isCorrect
                            ? '#198754'
                            : '#dc3545'
                    }">
                        Du valde: {{ result.option.label }}.
                        {{ result.option.text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    text-align: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    overflow-x: hidden;
    margin-top: auto;
    background-color: rgba(255, 255, 255, 0.844);
}

.row {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: visible;
    padding: 1rem 0;
}
</style>
