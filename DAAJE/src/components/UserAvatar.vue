<script>
import userImage from "../imgs/Richard.jpg";
import LoginModule from "../components/LogInModule.vue"
export default {
    components:{
        LoginModule
    },
  data() {
    return {
        showLogIn : false,
      avatarImg: userImage,
    };
  },
  methods:{
    toggleShowLogIn(){
        this.showLogIn = !this.showLogIn
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
        <button @click="toggleShowLogIn" class="login-user-btn">Logga in / Skapa konto</button>
      </div>
    </div>
  </section>
  <LoginModule v-show="showLogIn"/>
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
