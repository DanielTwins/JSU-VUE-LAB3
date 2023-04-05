<script>
export default {
  data() {
    return {
      userError : false,
      passwordError : false,
      emailError : false,
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
    <div class="direction-btn-container">
      <button v-show="logIn" @click="toggleShow" class="direction-btn">X</button>
      <button v-show="!logIn" @click="signingIn" class="direction-btn">Tillbaka</button>
    </div>

    <form v-show="logIn" @submit.prevent="handleLogIn" class="login-regular-container">
      <div class="input-container">
        <label for="email" class="input-label">Epost</label>
        <input class="input-value" v-model="email" type="email" required />
        <p v-if="emailError">Fel</p>
      </div>
      <div class="input-container">
        <label for="password" class="input-label">Lösenord</label>
        <input
          class="input-value"
          v-model="password"
          type="password"
          required
        />
        <p v-if="passwordError">Fel</p>
      </div>
      <div class="submit-btn-container">
        <button type="submit" class="login-btn">Logga in</button>
        <p>Eller</p>
        <button @click="signingIn" class="signIn-btn">Skapa konto</button>
      </div>
    </form>
    <button v-show="logIn"  @click="forgotPassword" class="forgot-btn">Glömt lösenord?</button>

    <form v-show="!logIn" @submit.prevent="handleSignIn" class="login-new-container">
        <div class="input-container">
        <label for="userName" class="input-label">Användarnamn</label>
        <input
          class="input-value"
          v-model="userName"
          type="text"
          required
        />
        <p v-if="userError">Fel</p>
      </div>
      <div class="input-container">
        <label for="password" class="input-label">Lösenord</label>
        <input
          class="input-value"
          v-model="signPassword"
          type="password"
          required
        />
        <p v-if="passwordError">Fel</p>
      </div>
      <div class="input-container">
        <label for="email" class="input-label">Epost</label>
        <input class="input-value" v-model="signEmail" type="email" required />
        <p v-if="emailError">Fel</p>
      </div>
      <div class="submit-btn-container">
        <button type="submit" class="login-btn">Skapa ditt nya konto</button>
      </div>
    </form>
  </div>
</template>

<style>
.login-container {
  background-color: white;
}

.direction-btn-container{

}

.direction-btn{

}

.login-regular-container{

}

.login-new-container{

}

.input-container{

}

.input-label{

}

.input-value{

}

.submit-btn-container{

}

.login-btn{

}

.signIn-btn{

}

.forgot-btn{

}
</style>
