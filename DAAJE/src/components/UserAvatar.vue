<!-- eslint-disable -->
<script>
import userImage from '../imgs/avatar_placeholder.png';
import placeHolderAvatarImg from '../imgs/placeholderAvatarImg.png';
import LoginModule from './LogInModule.vue';

export default {
  components: {
    LoginModule,
  },
  data() {
    return {
      showLogin: false,
      userLoggedIn: false,
      avatarImg: placeHolderAvatarImg,
      userName: 'Hello Quizzer!',
      userRole: '',
    };
  },
  created(){
    this.userLogIn()
  },
  methods: {
    received(boolean) {
      this.showLogin = boolean;
    },
    toggleShowLogin() {
      this.showLogin = !this.showLogin;
    },
    async userLogIn(status) {
      const userId = await localStorage.getItem('usertoken');
      console.log(userId)
      if (userId) {
        // get userName from userToken
        this.userName = 'Quizninja';
        this.avatarImg = userImage
        this.userLoggedIn = true;
      }
    },
    logOutUser() {
      console.log('Loggar ut');
    },
  },
};
</script>
<!-- eslint-disable -->
<template>
  <section class="avatar-wrapper">
    <div class="avatar-container">
      <img class="avatar-image" :src=avatarImg />
    </div>
    <div class="avatar-info">
      <p class="user-info">{{ userName }}</p>
      <p class="user-info">{{ userRole }}</p>
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
<!-- eslint-disable -->
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

.user-info {
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

.logout-user-btn {
  color: var(--light-purple);
}
</style>
