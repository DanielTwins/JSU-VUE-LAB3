<script>
import userImage from "../imgs/Richard.jpg";

export default {
  data() {
    return {
      avatarImg: userImage,
    };
  },
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
    </div>
  </section>
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
</style>
