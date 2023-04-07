<script>
import userImage from "../imgs/Richard.jpg";
import LoginModule from "../components/LogInModule.vue"
export default {
  components:{
      LoginModule
  },
  data() {
    return {
      showLogin : false,
      userLoggedIn : false,
      avatarImg: userImage,
    };
  },
  methods:{
    received(boolean) {this.showLogin = boolean}
    ,
    toggleShowLogin(){
        this.showLogin = !this.showLogin
    },
    logOutUser(){
        console.log('Loggar ut')
    }
  }
};
</script>

<template>
  <section class="avatar-wrapper">
    <div class="avatar-container">
      <img class="avatar-image" :src="avatarImg" />
    </div>
    <div class="avatar-info">
      <div class="user-info">Hello, Richard </div>
      <div class="user-info">JavaScript Educator</div>
      <div class="login-user-btn-container">
        <button v-if="!userLoggedIn" @click="toggleShowLogin" class="login-user-btn">Logga in / Skapa konto</button>
        <button v-if="userLoggedIn" @click="logOutUser" class="logout-user-btn">Logga ut</button>
      </div>
    </div>
  </section>
  <LoginModule @booleanToParent="received" v-show="showLogin"/>
</template>


<style>
.avatar-wrapper {
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

.login-user-btn{
    color: #FFFFFF;
    padding-top: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>
