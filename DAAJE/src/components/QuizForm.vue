<template>
    <div class="m-space"></div>
    <div>
        <form v-if="showForm" @submit.prevent="submitForm">

            <div>
                <label class="form-label" for="quiz-name">Quiz Namn:</label>
                <input class="form-control mb-3" id="quiz-name" type="text" v-model="quizName" required />
            </div>
            <!---Quizcategory label, låter användaren kategorisera-->
            <div>
                <label class="form-label mb-4" for="quiz-category">Quiz Kategori:</label>
                <select class="form-select mb-4" id="quiz-category" v-model="quizCategory">
                    <option v-for="category in categories" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
            <div class="mb-3" v-for="(question, index) in questions" :key="index">
                <!---Loopar igenom varje question och använder index för att identifiera positionen i varje element-->
                <label class="form-label" :for="'question-' + index">Fråga, {{ index + 1 }}</label>
                <input class="form-control mb-4" :id="'question-' + index" type="text" v-model="question.text" required />

                <div class="options" v-for="(option, optionIndex) in question.options" :key="optionIndex">
                    <label class="form-label" :for="'option-' + index + '-' + optionIndex">Svars alternativ {{ optionIndex +
                        1 }}:</label>
                    <input class="form-control mb-3" :id="'option-' + index + '-' + optionIndex" type="text"
                        v-model="option.text" required /><!---Använder enkel V-model och binder den till question arrayen-->
                    <input class="mb-4" type="radio" :id="'correct-' + index + '-' + optionIndex" :name="'correct-' + index"
                        v-model="question.correctAnswer" :value="option.id" />
                    <label class="form-label" :for="'correct-' + index + '-' + optionIndex">Lägg till alternativ {{
                        optionIndex
                        +
                        1
                    }}, som rätt svar.</label>
                </div>
            </div>
            <!---Quizspråk, låter användaren välja språk -->
            <div class="mb-5">
                <label class="form-label" for="language-select">Language:</label>
                <select class="form-select mb-4" id="language-select" v-model="selectedLanguage">
                    <option v-for="language in languages" :value="language" :key="language">
                        {{ language }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-8">
                        <AppButton class="text-center" color="light" size="medium" padding="p-small" type="button"
                            @click="addQuestion">Lägg
                            till ny fråga</AppButton>
                    </div>
                    <div class="col-4">
                        <button class="send-button" type="submit">Skapa Quiz!</button>
                    </div>
                </div>

            </div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>

        <!-- Behövs den här funktionen? -->
        <!-- <AppButton color="light" size="medium" padding="p-small" @click="getQuiz">Get Quiz</AppButton> -->

        <!-- Är det här kvar från tidigare quiz? -->
        <!-- <ul v-if="quiz">
            <li v-for="(question, index) in quiz.questions" :key="index">
                <h3>{{ question.text }}</h3>
                <ul>
                    <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        {{ option }}
                    </li>
                </ul>
            </li>
        </ul>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div> -->
    </div>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
    data() {
        return {
            quizCategory: null,
            showForm: true,
            questions: [
                //Array där texten kommer från användaren, flerval
                {
                    text: '',
                    options: [
                        { id: 1, text: '', label: 'A', isCorrect: false },
                        { id: 2, text: '', label: 'B', isCorrect: false },
                        { id: 3, text: '', label: 'C', isCorrect: false },
                        { id: 4, text: '', label: 'D', isCorrect: false }
                    ],
                    correctAnswer: null
                }
            ],
            quiz: null,
            errorMessage: null, //Felmeddelande om inte quizet går att visas
            quizName: '',
            languages: [
                'Svenska',
                'English',
                'Deutsch',
                'Español',
                'Français'
            ],
            selectedLanguage: '',
            categories: ['Vue', 'React', 'JavaScript', 'Node', 'Other']
        }
    },
    methods: {
        setTrue() {
            const correctIndex = this.questions[this.questions.length - 1].correctAnswer - 1;
            console.log(correctIndex);
            // guard clause for correct answer index not being set
            if (correctIndex != (-1)) {
                this.questions[this.questions.length - 1].options[correctIndex].isCorrect = true;
            } else {
                console.log("Could not create quiz with missing correct answer selection");
            }
        },
        addQuestion() {
            this.setTrue()
            this.questions.push({
                text: '',
                options: [
                    { id: 1, text: '', label: 'A', isCorrect: false },
                    { id: 2, text: '', label: 'B', isCorrect: false },
                    { id: 3, text: '', label: 'C', isCorrect: false },
                    { id: 4, text: '', label: 'D', isCorrect: false }
                ],
                correctAnswer: null
            })

        },
        async submitForm() {
            this.setTrue()  //must be called here for the last index "isCorrect" to be set.
            // variabel som sammanställer frågorna som skapats i samma format som quizQuestions.json.
            // **Glöm inte att ändra propertyn "name" till en variabel för userns eget input **
            const postBody = {
                    id: '',
                    img: '',
                    name: this.quizName,
                    questions: this.questions,
                    category: this.quizCategory
                };
            if (this.selectedLanguage) {
                postBody.language = this.selectedLanguage
            } /*Om det finns ett valt språk, så lägger denna till det som det första elementet i postBody arrayen. */
            const usertoken = JSON.parse(localStorage.getItem("usertoken"));
            if (!usertoken) {
                return alert("You must be logged in to create a quiz");
            }
            try {
                const response = await fetch(
                    `http://localhost:8080/post/create_quiz/${usertoken.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(postBody)
                    }
                ).then(location.reload()) //added reload page after posting new quiz
                const data = await response.json()
                console.log(data)
                this.showForm = false
                this.questions = [
                    {
                        text: '',
                        options: [
                            { id: 1, text: '', isCorrect: false },
                            { id: 2, text: '', isCorrect: false },
                            { id: 3, text: '', isCorrect: false },
                            { id: 4, text: '', isCorrect: false }
                        ],
                        correctAnswer: null
                    }
                ]
            } catch (error) {
                console.error(error)
                this.errorMessage = 'Could not create quiz'
            }
        }
    },
    getQuiz() {
        this.errorMessage = null //Klickfunktion för att kalla på rätt quiz
        this.quiz = this.generateQuiz()
    },
    generateQuiz() {
        //Skapar en quiz baserat på användarens inmatning
        const quiz = {
            questions: this.questions.map((question) => ({
                text: question.text,
                options: question.options.map((option) => option.text),
                correctAnswer: question.correctAnswer
            }))
        }
        console.log(quiz) //Loggar den och sparar den i var quiz
        return quiz
    },

    components: { AppButton }
}
</script>

<style scoped>
div {
    color: white
}

.options {
    padding: 1rem;
    border-left: 1px #c164ec solid;
    border-right: 1px #c164ec solid;
}

.options:first-of-type {
    border-top: 1px #c164ec solid;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.options:last-child {
    border-bottom: 1px #c164ec solid;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

.send-button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: aliceblue;
    color: #5f0a87;
    box-shadow: .3rem .3rem .1rem #c164ec;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: inline-block;
    text-align: center;
    width: 100%;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
