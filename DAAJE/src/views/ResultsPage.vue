<script>
import { useResultStore } from "../stores/resultStore"
import UserAvatar from "../components/UserAvatar.vue"
import Chart from 'chart.js/auto'

export default {
	components: {
		UserAvatar
	},
	data() {
		return {
			userName: "Richard",
			userRole: "JavaScript Educator",
		}
	},
	setup() {
		const resultStore = useResultStore();
		const fetchedResults = resultStore.fetchedResults;
		// guard clause for empty result array
		if (fetchedResults.length > 0) {
			const fetchedResultsShortened = [...fetchedResults[0].response.data.slice(1)];

			let resultSumArray = [];
			let totalCorrectAnswers = 0;
			let totalAmountQuestions = 0;
			let index = 0;

			// Sort fetched result data
			// looping through the entire list of answers in all quiz results
			fetchedResultsShortened.forEach(elem => {

				while (index < fetchedResultsShortened[0].resultData.length) {
					let resultSummary = 0;
					let questionId = elem.resultData[index].question.id
					let question = elem.resultData[index].question.text

					resultSumArray.push({ questionId, question, resultSummary, totalAmountQuestions })

					index++;
				}
			})

			// for loop to count each correct answer in each quiz result
			// and add total right for each individual question.
			for (let i = 0; i < fetchedResultsShortened.length; i++) {
				for (let j = 0; j < fetchedResultsShortened[i].resultData.length; j++) {
					const studentAnswer = fetchedResultsShortened[i].resultData[j].option.isCorrect;

					// adding total count of questions from all quizzes and questions within.
					totalAmountQuestions++;

					if (studentAnswer) {
						resultSumArray[j]['resultSummary']++;
						totalCorrectAnswers++
					}
				}
			}

			return { fetchedResults, fetchedResultsShortened, resultSumArray, totalCorrectAnswers, totalAmountQuestions }

		} else { // do this if no results are in the store
			console.log("Error: No results in store");
			window.location.href = "/";
			alert("Sorry, no results are in yet!");
		}
	},
	mounted() {
		const ctx = document.getElementById('myChart');
		const MyChart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: ["Rätt svar", "Fel svar"],
				datasets: [
					{
						label: "Resultat av Quiz",
						data: [this.totalCorrectAnswers, (this.totalAmountQuestions - this.totalCorrectAnswers)],
						// backgroundColor: "rgba(54,73,93,.5)",
						// borderColor: "#36495d",
						borderWidth: 3,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						labels: {
							color: 'white',
							font: {
								Size: 18
							}
						}
					}
				}
			}
		})
		MyChart;
	}
}
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<UserAvatar :userName="userName" :userRole="userRole" />
				<h1 class="mb-2 mt-2">Total results for this quiz</h1>

				<main class="main-content">
					<canvas id="myChart"></canvas>

					<div class="sum-results">
						<h4 class="mb-4">Totalt {{ totalCorrectAnswers }} rätt,
							från {{ totalAmountQuestions }} frågor.</h4>
						<h4>Totalt
							{{ fetchedResultsShortened.length }} inlämande quizzes</h4>
					</div>

					<div v-for="(result, index) in resultSumArray">
						<h5>{{ result.questionId }}: {{ result.question }}</h5>
						<p class="mb-5">Elevers svar: {{ result.resultSummary }} rätt av {{
							fetchedResultsShortened.length }} inkomna svar.</p>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped>
.sum-results {
	padding-top: 1.3rem;
	padding-bottom: 1.8rem;
	text-align: center;
	justify-content: center;
	align-items: center;
}

h1,
h4,
h5,
p {
	color: white;
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