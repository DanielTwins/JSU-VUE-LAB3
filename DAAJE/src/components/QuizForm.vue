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
                <input class="form-control mb-5" :id="'question-' + index" type="text" v-model="question.text" required />

                <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                    <label class="form-label" :for="'option-' + index + '-' + optionIndex">Svars alternativ, {{ optionIndex
                        +
                        1
                    }}</label>
                    <input class="form-control mb-3" :id="'option-' + index + '-' + optionIndex" type="text"
                        v-model="option.text" required /><!---Använder enkel V-model och binder den till question arrayen-->
                    <input class="mb-4" type="radio" :id="'correct-' + index + '-' + optionIndex" :name="'correct-' + index"
                        v-model="question.correctAnswer" :value="option.id" />
                    <label class="form-label" :for="'correct-' + index + '-' + optionIndex">Lägg till som rätt svar</label>
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
                        <AppButton color="light" type="button" @click="addQuestion">Lägg till ny fråga</AppButton>
                    </div>
                    <div class="col-4">
                        <AppButton color="send" type="submit">Skapa Quiz!</AppButton>
                    </div>
                </div>

            </div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>

        <!-- Behövs den här funktionen? -->
        <!-- <AppButton color="light" @click="getQuiz">Get Quiz</AppButton> -->


        <!-- Är det här kvar från tidigare quiz? -->
        <ul v-if="quiz">
            <li v-for="(question, index) in quiz.questions" :key="index">
                <h3>{{ question.text }}</h3>
                <ul>
                    <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        {{ option }}
                    </li>
                </ul>
            </li>
        </ul>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
    data() {
        return {
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
            const postBody = [
                {
                    id: '',
                    img: '',
                    name: this.quizName,
                    questions: this.questions,
                    category: this.quizCategory
                }
            ]
            if (this.selectedLanguage) {
                postBody[0].language = this.selectedLanguage
            } /*Om det finns ett valt språk, så lägger denna till det som det första elementet i postBody arrayen. */
            try {
                const response = await fetch(
                    //hotfixed request path 8/3 /E.N
                    'http://localhost:8080/post/create_quiz',
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

/* .full-width {
    width: 100%;

}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 600px;
}

form input {
    margin-bottom: 10px;
}

.m-space {
    margin: 3rem 0;
} */

.error {
    color: red;
    margin-top: 10px;
}
</style>
