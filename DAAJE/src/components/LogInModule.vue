<!-- eslint-disable -->
<script>
import axios from 'axios';

export default {
  data() {
    return {
      userLogIn: false,
      userError: false,
      passwordError: false,
      emailError: false,
      logIn: true,
      email: '',
      password: '',
      userName: '',
      signEmail: '',
      signPassword: '',
      loggedInStatus: false,
    };
  },
  methods: {
    showLogin(boolean) {
      this.$emit('booleanToParent', boolean);
    },
    userIsLoggedIn(status) {
        console.log("loginmodle"+ status)
        this.$emit('loggedIn', status)
    },
    async handleRegisterNewUser() {
      try {
        console.log(
          `Användarnamn ${this.userName}Epost ${this.signEmail}, lösenord ${this.signPassword}`,
        );
        await axios.post("http://localhost:8080/post/new_user", {
          username: this.userName,
          email: this.signEmail,
          password: this.signPassword,
        });
        this.showLogin(false);
        this.userName = '';
        this.signEmail = '';
        this.emailError = false;
      } catch (error) {
        this.emailError = error.response.data.message;
      }
    },
    async handleLogIn() {
      try {
        const usertoken = await axios.post(
          "http://localhost:8080/post/login",
          {
            email: this.email,
            password: this.password,
          },
        );
        if (usertoken) {
          localStorage.setItem('usertoken', usertoken.data); // store this in pinia instead? @johan
          this.$loggedInStatus = true; // this bool is for tracking logged in status
          // call methods here to update GUI with user details @chris
        }
        this.passwordError = false;
        this.showLogin(false);
        this.userIsLoggedIn(this.$loggedInStatus)
      } catch (error) {
        this.passwordError = error.response.data;
      }
    },
    signingIn() { /* byt vy mellan signin/login */
      this.logIn = !this.logIn;
    },
    forgotPassword() {
      console.log('ok');
    },
  },
};
</script>
<!-- eslint-disable -->
<template>
  <div class="login-wrapper-top-bottom">
    <div @click="showLogin(false)" class="clickable-area" />
    <div class="login-wrapper">
      <div @click="showLogin(false)" class="clickable-area" />
      <div class="login-container">
        <div class="direction-btn-container">
          <button
            v-show="logIn"
            @click="showLogin(false)"
            class="direction-btn"
          >
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
              <line id="LINE" class="line" x1="40" y1="20" x2="1" y2="20" />
              <polyline
                id="POINT"
                class="point"
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
            <input class="input-value" v-model="email" type="email" />
            <p class="error-text" v-if="emailError">Fel, {{ emailError }}</p>
          </div>
          <div class="input-container">
            <label for="password" class="input-label">Lösenord</label>
            <input
              class="input-value"
              v-model="password"
              type="password"
            />
            <p class="error-text" v-if="passwordError">Fel användarnamn eller lösenord ({{ passwordError }})</p>
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
          @submit.prevent="handleRegisterNewUser"
          class="login-new-container"
        >
          <div class="input-container">
            <label for="userName" class="input-label">Användarnamn</label>
            <input
              class="input-value"
              v-model="userName"
              type="text"
            />
            <p class="error-text" v-if="userError">Fel</p>
          </div>
          <div class="input-container">
            <label for="password" class="input-label">Lösenord</label>
            <input
              class="input-value"
              v-model="signPassword"
              type="password"
            />
            <p class="error-text" v-if="passwordError">Fel</p>
          </div>
          <div class="input-container">
            <label for="email" class="input-label">Epost</label>
            <input
              class="input-value"
              v-model="signEmail"
              type="email"
            />
            <p class="error-text" v-if="emailError">Fel, {{ emailError }}</p>
          </div>
          <div class="submit-btn-container">
            <button type="submit" class="login-btn">
              Skapa ditt nya konto
            </button>
          </div>
        </form>
      </div>
      <div @click="showLogin(false)" class="clickable-area" />
    </div>
    <div @click="showLogin(false)" class="clickable-area" />
  </div>
</template>
<!-- eslint-disable -->
<style>
.login-wrapper-top-bottom{
    display: grid;
  grid-template-rows: 50px auto 50px;
  position: fixed;
  z-index: 9999;
  top: 0.2rem;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0.3rem;
}
.login-wrapper {
  display: grid;
  grid-template-columns: 5px auto 5px;
}

.clickable-area{
    width: 100%;
}

.login-container {
  min-width: 200px;
  padding: 1rem;
  max-width: 800px;
  background-color: var(--frosty-purple-bg);
  backdrop-filter: blur(20px);
  border-radius: 10px;
}

@media (min-width: 400px) {
  .login-wrapper {
    grid-template-columns: auto auto auto;
    top: 0.2rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.3rem;
  }

  .login-container {
    min-width: 390px;
  }
}

@media (min-width: 1400px ) {
    .login-container {
   min-width: 100%;
  }
}
button {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
}
.direction-btn {
  --stroke: 3px;
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
  stroke: var(--white, white);
  stroke-miterlimit: 10;
  stroke-width: var(--stroke);
}

.point {
  fill: none;
}

.point,
.line {
  stroke: var(--light-purple);
  stroke-miterlimit: 10;
  stroke-width: var(--stroke);
}

.line {
  fill: #fff;
}

.login-regular-container,
.login-new-container {
  width: 100%;
  margin-top: 15vh;
}

.input-container {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 25px 45px 35px;
  max-width: 500px;
}

.input-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--purple);
}

.input-value {
  border-radius: 10px;
  border: none;
  padding: 0.5rem;
  border: 2px solid var(--purple);
}

.submit-btn-container {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.submit-btn-container p {
  padding: 0;
  margin: 0;
  text-align: center;
  font-weight: 600;
  color: var(--purple);
  font-size: 0.8rem;
}

.error-text {
  color: var(--error, red);
}

.login-btn,
.signIn-btn {
  max-width: 250px;
  margin: 0 auto;
  width: 100%;
  padding: 0.8rem;
  font-weight: 500;
  border-radius: 10px;
  font-size: 0.8rem;
}

.login-btn {
  background-color: var(--purple, purple);
  background-image: linear-gradient(306deg, #c164ec 0%, #5f0a87 84%);
  color: var(--white, white);
}

.signIn-btn {
  color: var(--purple);
  border: 3px solid var(--purple);
}

.forgot-btn-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.forgot-btn {
  color: var(--purple);
  font-size: 0.7rem;
  font-weight: 500;
  text-decoration: underline;
  padding-bottom: 3vh;
}
</style>
