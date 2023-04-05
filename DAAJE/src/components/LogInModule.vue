<script>
export default {
    data(){
        return{
            emailInput : '',
            passwordInput : ''
        }
    }
};
</script>

<template>
  <div class="login-container">
    <div class="btn-container">
      <button @click="toggleShow" class="close-module-container">X</button>
      <button class="close-module-container">Tillbaka</button>
    </div>
    <form class="login-regular-container">
        <label class="input-label">Epost</label>
        <input class="input-value" v-model="emailInput" type="email" required>
        <label class="input-label">Lösenord</label>
        <input class="input-value" v-model="passwordInput" type="password" required>
    </form>
    <h1>LOGIN</h1>
  </div>
</template>

<style>
.login-container {
  background-color: blue;
}
</style>
