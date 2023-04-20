<!-- eslint-disable -->
<template>
  <nav class="navbar">
    <UserAvatar />
    <div class="navbar-brand">
      <span class="navbar-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
    <ul class="navbar-menu" :class="menu">
      <li>
        <router-link to="/" @click="runToggleMenu">Home</router-link>
      </li>

      <li>
        <router-link to="/quiz" @click="runToggleMenu">Quiz</router-link>
      </li>

      <li>
        <router-link to="/results-view" @click="runToggleMenu">Results</router-link>
      </li>

      <li>
        <router-link to="/about" @click="runToggleMenu">About</router-link>
      </li>
    </ul>
  </nav>
</template>
<!-- eslint-disable -->
<script>
import UserAvatar from './UserAvatar.vue';

export default {
  components: {
    UserAvatar,
  },
  name: 'TheNavbar',
  data() {
    return {
      isFunctionDisabled: false,
      isDropdownOpen: false,
      menu: 'desktop-mode',
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleScreenSizeChange);
    this.handleScreenSizeChange();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleScreenSizeChange);
  },
  methods: {
    handleScreenSizeChange() {
      this.isFunctionDisabled = window.innerWidth > 1024;
    },
    runToggleMenu() {
      if (!this.isFunctionDisabled) {
        console.log('Är igång')
        this.toggleMenu();
      }
    },
    toggleMenu() {
        console.log('menuknapp')
      if (this.menu === 'navbar-menu--open') {
        this.menu = 'desktop-mode';
      } else {
        this.menu = 'navbar-menu--open';
      }
    },
  },
};
</script>
<!-- eslint-disable -->
<style>
.navbar {
  margin: 0 -20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5c025c;
  position: absolute;
  top: 1rem;
  right: 0;
  left: 0;
  border-radius: 40px;
  background-color: var(--frosty-bg);
}

.navbar-brand {
  padding: 0 1rem 0 0;
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
  position: relative;
  top: 3rem;
  right: 0;
  width: 100%;
  background-color: hsl(300, 24%, 17%);
  z-index: 1;
  min-height: 50vh;
}

.navbar-menu--open {
  display: flex;
  justify-content: space-around;
}

.navbar-menu li {
  /* margin: 0 10px; */
  padding: 1rem 0;
  border-bottom: solid 1px #fff;
}

.navbar-menu li:last-child {
  border-bottom: none;
}

.navbar-menu li a {
  text-align: center;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  /* justify-content: flex-end; /* li to the left  */
}

.desktop-mode {
  display: none;
}

@media (min-width: 1024px) {
  .navbar-brand {
    display: none;
  }

  .navbar-menu--open,
  .desktop-mode {
    margin-left: auto;
    max-width: 500px;
    background: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    justify-content: space-between;
    /* display: grid;
      grid-template-columns: repeat(4,80px); */
  }

  .navbar {
    padding: 0 !important;
  }

  .navbar-menu {
    list-style: none;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 1rem;
    padding: 2rem;
  }
  .navbar-menu li {
    /* margin: 0 10px; */
    padding: 0;
    border-bottom: 0;
  }
}
</style>
