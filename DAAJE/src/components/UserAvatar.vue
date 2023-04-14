<script>
import userImage from '../imgs/Richard.jpg';
import LoginModule from './LogInModule.vue';

export default {
  components: {
    LoginModule,
  },
  data() {
    return {
      showLogin: false,
      userLoggedIn: false,
      avatarImg: userImage,
      userName : "Hello Quizzer",
      userRole : ''
    };
  },
  methods: {
    received(boolean) {
      this.showLogin = boolean;
    },
    toggleShowLogin() {
      this.showLogin = !this.showLogin;
    },
    userLogIn(status) {
      if (localStorage.getItem('usertoken')) {
        this.userName = 'User is logged in'
        this.userLoggedIn = status
      }
    },
    logOutUser() {
      console.log('Loggar ut');
    },
  },
};
</script>

<template>
  <section class="avatar-wrapper">
    <div class="avatar-container">
      <img class="avatar-image" src="../imgs/Richard.jpg" />
    </div>
    <div class="avatar-info">
      <p class="user-info">{{userName}}</p>
      <p class="user-info">{{userRole}}</p>
      <div class="login-user-btn-container">
        <button
          v-if="!userLoggedIn"
          @click="toggleShowLogin"
          class="login-user-btn"
        >
          Logga in / Skapa konto
        </button>
        <button v-if="userLoggedIn" @click="logOutUser" class="logout-user-btn">
          Logga ut
        </button>
      </div>
    </div>
  </section>
  <LoginModule
    @loggedIn="userLogIn"
    @booleanToParent="received"
    v-show="showLogin"
  />
</template>

<style>
.avatar-wrapper {
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.65rem;
  align-items: center;
}

.avatar-container {
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-info {
  display: flex;
  flex-direction: column;

  color: #fff;
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.user-info{
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 16px;

}

.login-user-btn,
.logout-user-btn {
  padding-top: 0.5rem;
  font-weight: bold;
  color: var(--white);
  background: transparent;
  border: none;
  cursor: pointer;
}

.logout-user-btn{
    color: var(--light-purple)
}
</style>
