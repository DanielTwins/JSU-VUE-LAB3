<script>
export default {
  data() {
    return {
      logIn: true,
      email: '',
      password: '',
      userName : '',
      signEmail : '',
      signPassword : ''
    };
  },
  methods: {
    handleSignIn(){
        console.log(`Användarnamn ${this.userName}Epost ${this.signEmail}, lösenord ${this.signPassword}`);
    },
    handleLogIn() {
      console.log(`Epost ${this.email}, lösenord ${password}`);
    },
    signingIn() {
        this.logIn = !this.logIn
    },
    forgotPassword(){
        console.log('ok')
    }
  },
};
</script>

<template>
  <div class="login-container">
    <div class="btn-container">
      <button v-show="logIn" @click="toggleShow" class="close-module-container">X</button>
      <button v-show="!logIn" @click="signingIn" class="close-module-container">Tillbaka</button>
    </div>

    <form v-show="logIn" @submit.prevent="handleLogIn" class="login-regular-container">
      <div class="input-container">
        <label class="input-label">Epost</label>
        <input class="input-value" v-model="email" type="email" required />
      </div>
      <div class="input-container">
        <label class="input-label">Lösenord</label>
        <input
          class="input-value"
          v-model="password"
          type="password"
          required
        />
      </div>
      <div class="submit-btn-container">
        <button type="submit" class="login-btn">Logga in</button>
        <p>Eller</p>
        <button @click="signingIn" class="signIn-btn">Skapa konto</button>
        <button @click="forgotPassword" class="forgot-btn">Glömt lösenord?</button>
      </div>
    </form>

    <form v-show="!logIn" @submit.prevent="handleSignIn" class="login-new-container">
        <div class="input-container">
        <label class="input-label">Användarnamn</label>
        <input
          class="input-value"
          v-model="userName"
          type="text"
          required
        />
      </div>
      <div class="input-container">
        <label class="input-label">Lösenord</label>
        <input
          class="input-value"
          v-model="signPassword"
          type="password"
          required
        />
      </div>
      <div class="input-container">
        <label class="input-label">Epost</label>
        <input class="input-value" v-model="signEmail" type="email" required />
      </div>
      <div class="submit-btn-container">
        <button type="submit" class="login-btn">Skapa konto</button>
      </div>
    </form>
  </div>
</template>

<style>
.login-container {
  background-color: white;
}
</style>
