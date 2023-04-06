<script>
export default {
  data() {
    return {
      userError: false,
      passwordError: false,
      emailError: false,
      logIn: true,
      email: '',
      password: '',
      userName: '',
      signEmail: '',
      signPassword: '',
    };
  },
  methods: {
    showLogin(boolean) {
      this.$emit('booleanToParent', boolean);
    },
    handleSignIn() {
      console.log(
        `Användarnamn ${this.userName}Epost ${this.signEmail}, lösenord ${this.signPassword}`
      );
      this.showLogin(false);
    },
    handleLogIn() {
      console.log(`Epost ${this.email}, lösenord ${password}`);
      this.showLogin(false);
    },
    signingIn() {
      this.logIn = !this.logIn;
    },
    forgotPassword() {
      console.log('ok');
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="direction-btn-container">
      <button v-show="logIn" @click="showLogin(false)" class="direction-btn">
        <svg
          class="cross"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <polyline
            id="POINT"
            class="cross-detail"
            points="39.71 .29 20 20 39.71 39.71"
          />
          <polyline
            id="POINT-2"
            data-name="POINT"
            class="cross-detail"
            points=".33 39.71 20.04 20 .33 .29"
          />
        </svg>
      </button>
      <button v-show="!logIn" @click="signingIn" class="direction-btn">
        <svg
          class="arrow"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <line id="LINE" class="cls-2" x1="40" y1="20" x2="1" y2="20" />
          <polyline
            id="POINT"
            class="cls-1"
            points="20.33 .29 .62 20 20.33 39.71"
          />
        </svg>
      </button>
    </div>

    <form
      v-show="logIn"
      @submit.prevent="handleLogIn"
      class="login-regular-container"
    >
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
    <div class="forgot-btn-container">
      <button v-show="logIn" @click="forgotPassword" class="forgot-btn">
        Glömt lösenord?
      </button>
    </div>

    <form
      v-show="!logIn"
      @submit.prevent="handleSignIn"
      class="login-new-container"
    >
      <div class="input-container">
        <label for="userName" class="input-label">Användarnamn</label>
        <input class="input-value" v-model="userName" type="text" required />
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
  --black: #000000;
  --white: #FFFFFF;
  --purple: #5f0a87;
  --light-purple: #C6BBFA;
  z-index: 999;
  position: fixed;
  top: 0.3rem;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0.3rem;
  background-color: var(--light-purple);
  /* background-color: rgba(244, 244, 244, 0.65); */
  /* background-color: rgba(95, 10, 135, 0.5); */
  background-color: rgba(198, 187, 250, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  /* overflow: scroll; */

}

@media (min-width: 400px) {
  .login-container {
    top: .5rem;
    left: .5rem;
    right: .5rem;
    bottom: .5rem;
  }
}

.direction-btn-container {
  margin: 1rem 0 0 1rem;
}
button {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
}
.direction-btn {
  --stroke: 3px;
  /* border: var(--stroke) solid var(--purple); */
  background-color: var(--purple);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  border-radius: 3px;
}

.arrow,
.cross {
  width: 20px;
  height: 20px;
}

.cross-detail {
  fill: none;
  stroke: var(--light-purple);
  stroke-miterlimit: 10;
  stroke-width: var(--stroke);
}

.cls-1 {
  fill: none;
}

.cls-1,
.cls-2 {
  stroke: var(--light-purple);
  stroke-miterlimit: 10;
  stroke-width: var(--stroke);
}

.cls-2 {
  fill: #fff;
}

.login-regular-container {
}

.login-new-container {
}

.input-container {
    margin: 0 auto;
  display: grid;
  padding: 1.2rem;
  max-width: 500px;
}

.input-label {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.input-value {
  border-radius: 10px;
  border: none;
  padding: .7rem;
}

.submit-btn-container {
    margin-top: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.submit-btn-container p {
    padding: 0;
    margin: 0;
  text-align: center;
  font-weight: 600;
}

.login-btn,
.signIn-btn {
  max-width: 250px;
  margin: 0 auto;
  width: 100%;
  padding: 0.6rem;
  font-weight: 500;
  border-radius: 10px;
}

.login-btn {
  background-color: var(--purple, purple);
  background-image: linear-gradient(306deg, #c164ec 0%, #5f0a87 84%);
  color: var(--white, white);
}

.signIn-btn {
    color: var(--purple);
    border: 3px solid var(--purple);
  /* border-style: solid;
  border-width: 3px; */
  /* border-image: linear-gradient(306deg, #c164ec 0%, #5f0a87 84%) 1; */
}

.forgot-btn-container{
    margin-top: 1rem;
    display: flex;
  justify-content: center;
  flex-direction: column;
}

.forgot-btn{
    font-weight: 600;
}
</style>
