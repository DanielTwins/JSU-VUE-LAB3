<script setup>
import AppButton from './AppButton.vue';

</script>

<template>
    <h1>Meet Our Developers</h1>
    <div class="container">

        <div class="row contact-us">
            <div class="col contact-block">
                <h3>Johan Hellberg</h3>
                <a href="https://www.linkedin.com/in/johan-hellberg-805078167/" target="_blank">
                    <AppButton width="" color="primary" size="small" padding="p-small">LinkedIn</AppButton>
                </a>
            </div>
            <div class="col contact-block">
                <h3>Elis Nilsén</h3>
                <a href="https://www.linkedin.com/in/elis-nilz%C3%A9n-78526b19b/" target="_blank">
                    <AppButton width="" color="primary" size="small" padding="p-small">LinkedIn</AppButton>
                </a>
            </div>
            <div class="col contact-block">
                <h3>Damir Dervovic</h3>
                <a href="https://www.linkedin.com/in/damir-dervovic-7265a3210/" target="_blank">
                    <AppButton width="" color="primary" size="small" padding="p-small">LinkedIn</AppButton>
                </a>
            </div>
            <div class="col contact-block">
                <h3>Daniel Naseri</h3>
                <a href="https://www.linkedin.com/in/daniel-naseri-899933197/" target="_blank">
                    <AppButton width="" color="primary" size="small" padding="p-small">LinkedIn</AppButton>
                </a>
            </div>
        </div>
    </div>
</template>

<style>
.contact-us {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* padding: 30px; */
    margin: 1rem .3rem;
    color: #ffffff;
    /* border-radius: 2rem; */
    /* background-color: black; */
}

.contact-block {
    margin: 0 20px 20px;
    text-align: center;
}

h3 {
    font-size: 24px;
    margin-bottom: 1rem;
}

p {
    font-size: 18px;
    margin-bottom: 12px;
}

h1 {
    text-align: center;
    margin: 1rem 0;
    color: #ffffff;
}

a {
    text-decoration: none;
}

a:hover {
    color: blueviolet;
}

.linkedin-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #fff;
    color: #6b38c9;
    border-radius: 30px;
    border: 2px solid #6b38c9;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.linkedin-button:hover {
    background-color: #6b38c9;
    color: #fff;
    cursor: pointer;
}
</style>
