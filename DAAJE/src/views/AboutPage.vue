<script setup>
import ContactUs from "../components/ContactUs.vue";
</script>

<template>
    <div class="row">
        <div class="col">
            <div class="user-avatar-filler"></div>
            <main class="main-content">
                <h1>About us</h1>
                <h4>An independent devteam passionate about learning.</h4>
                <div class="card-wrapper">
                    <p class="about-text">
                        Our development team is dedicated to crafting
                        cutting-edge learning solutions that empower
                        individuals and organizations to thrive in today's
                        ever-evolving world. We know that continuous
                        learning and upskilling are crucial to success, and
                        we strive to deliver innovative technologies that
                        enable people to learn more efficiently and
                        effectively.
                    <p> We
                        believe that learning should be accessible to all,
                        regardless of background, age, or level of
                        expertise. That's why we design our learning apps to
                        be intuitive and user-friendly, with clear
                        instructions and interfaces that guide learners
                        through each step of the process. Our aim is to make
                        learning enjoyable, engaging, and fulfilling, so
                        that learners remain motivated and achieve their
                        goals.</p>
                    <p>Our team is constantly pushing the limits of
                        goals.</p>
                    <p>Our team is constantly pushing the limits of
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
            </main>
        </div>

        <ContactUs />
    </div>
</template>


<style scoped>
.user-avatar-filler {
    height: 64px;
}

.card-wrapper {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    /* border: white solid 1rem; */
    /* border-radius: 10rem; */
}

p,
h4,
.about-text {
    text-align: center;
    color: #ffffff;
    justify-content: center;
    font-size: 18px;
}
</style>
