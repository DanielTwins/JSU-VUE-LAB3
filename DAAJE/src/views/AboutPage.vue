<script setup>
import ContactUs from "../components/ContactUs.vue";

</script>

<template>


    <div class="row">
        <div class="col pt-medium">

            <main class="main-content">

                <div class="card-wrapper">
                    <HomeCard />
                    <div class="hero-text">
                <h1>About us</h1>
                <h4>An independent devteam passionate about learning.</h4>
            </div>
                    <div class="textholder">
                        <p class="about-text">
                            Our development team is dedicated to crafting
                            cutting-edge learning solutions that empower
                            individuals and organizations to thrive in today's
                            ever-evolving world. We know that continuous
                            learning and upskilling are crucial to success, and
                            we strive to deliver innovative technologies that
                            enable people to learn more efficiently and
                            effectively. <p class="glitchtext"> We
                            believe that learning should be accessible to all,
                            regardless of background, age, or level of
                            expertise. That's why we design our learning apps to
                            be intuitive and user-friendly, with clear
                            instructions and interfaces that guide learners
                            through each step of the process. Our aim is to make
                            learning enjoyable, engaging, and fulfilling, so
                            that learners remain motivated and achieve their
                            goals.</p><p>Our team is constantly pushing the limits of
                            what's possible in learning technology, exploring
                            new approaches and experimenting with emerging
                            trends. We stay at the forefront of the industry by
                            attending conferences and workshops, and working
                            alongside top experts to bring the latest insights
                            and innovations to our products. Whether you're a
                            student striving to improve your grades, an employee
                            seeking to enhance your skills, or a company looking
                            to train your workforce, our learning apps are the
                            perfect tool to help you achieve your objectives.</p>
                        </p>
                    </div>
                </div>
                <ContactUs/>
            </main>
        </div>
    </div>
</template>


<style scoped>
    .pt-medium {
        padding-top: 20px;
    }

    .hero-text {
        padding: 3rem 0.3rem;
        color: #d9d7d7;
        margin-left: auto;
        margin-right: auto;
        font-style: italic;
    }


    .main-content {
        margin: 0 -20px;
        padding: 120px 20px 0 20px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;

        background: rgba(255, 255, 255, 0.2);
        -webkit-backdrop-filter: blur(9px);
        backdrop-filter: blur(9px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: white solid 1rem;
        border-radius: 10rem;
        margin-bottom: 1rem;
    }
    .about-text {
        text-align: center;
        color: #ffffff;
        justify-content: center;
        width: 40rem;
        margin-left: auto;
        margin-right: auto;
        font-size: 18px;
    }
    .text-holder {
        display: flex;
        justify-content: center;
        width: 50rem;
        background-color: #ffffff;
        border: solid white;
    }

    .glitchtext{
        padding-top: 1rem;
    }
</style>
