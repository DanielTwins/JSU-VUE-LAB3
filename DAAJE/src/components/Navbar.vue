<!-- <script setup></script>

<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/quiz">Quiz</router-link></li>
      <li><router-link to="/result">Result</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
}
.navbar ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.navbar ul li {
  margin-right: 20px;
}
.navbar ul li:last-child {
  margin-right: 0;
}
.navbar ul li a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
</style>
 -->
<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="navbar-toggle" @click="isDropdownOpen = !isDropdownOpen">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
    <ul class="navbar-menu" :class="{ 'navbar-menu--open': isDropdownOpen }">
      <li>
        <router-link to="/" @click="isDropdownOpen = false">Home</router-link>
      </li>

      <li>
        <router-link to="/quiz" @click="isDropdownOpen = false">Quiz</router-link>
      </li>

      <li>
        <router-link to="/results" @click="isDropdownOpen = false">Results</router-link>
      </li>

      <li>
        <router-link to="/about" @click="isDropdownOpen = false">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isDropdownOpen: false,
    };
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5c025c;
  position: absolute;
  top: 4.8rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2px !important;
}

.navbar-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  cursor: pointer;
}

.navbar-toggle span {
  width: 24px;
  height: 3px;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
}

.navbar-toggle span:nth-child(2) {
  transform-origin: center;
}

.navbar-toggle--open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.navbar-toggle--open span:nth-child(2) {
  transform: scaleX(0);
}

.navbar-toggle--open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.navbar-logo {
  margin-left: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.navbar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: none;
  flex-direction: column;
  position: absolute;
  top: 45px;
  right: 0;
  width: 100%;
  background-color: hsl(300, 24%, 17%);
  z-index: 1;
}

.navbar-menu--open {
  display: flex;
}

.navbar-menu li {
  margin: 0 10px;
  padding: 10px 0;

  border-bottom: solid 1px #fff;
}

.navbar-menu li:last-child {
  border-bottom: 0;
}

.navbar-menu li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  display: flex;
  /* justify-content: flex-end; /* li to the left  */
}
</style>
