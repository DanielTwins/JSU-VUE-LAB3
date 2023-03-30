<template>
    <div id="rsltBtn"> 
        <!-- <button type="button" @click="showConfetti">Se resultatet</button> -->
    </div>

</template>

<script>
    import JSConfetti from 'js-confetti'

    export default {
        props: {
            sumOfCorrectAnswers: Number
        },
        name: 'Confetti',
        data() {
            return {}
        },
        methods: {
            showConfetti() {
                const jsConfetti = new JSConfetti()
                if (this.sumOfCorrectAnswers >= 0) {
                    jsConfetti.addConfetti({
                        confettiRadius: 3,
                        confettiColors: [
                            'yellow',
                            'blue',
                            'red',
                            'green',
                            'orange'
                        ],
                        confettiNumber: 500,
                    })
                } else {
                    jsConfetti.addConfetti({ //kanske lägga till procenvis istället för statiskt
                        emojis: ['😢'],
                        emojiSize: 40,
                        confettiNumber: 50,
                    })
                }
            }
        },
        mounted () {
            this.showConfetti()
        }
    }
</script>

<style>
#rsltBtn{
    display: flex;
    justify-content: center;
}
</style>
