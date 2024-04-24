<template>
  <div class="nav-wrapper">
    <nav class="navbar">
      <div class="logo">ParentPal</div>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/milestone-tracker" class="nav-link">Milestone Tracker</router-link>
      <router-link to="/forum-view" class="nav-link">Forum</router-link>
      <div class="user-icon" @mouseover="showOptions = true">
        <i class="fas fa-user"></i>
        <transition name="fade">
          <div v-if="showOptions" class="user-options" @mouseover="cancelHideOptions" @mouseleave="hideOptions">
            <div class="option">
              <router-link to="/profile" class="nav-link-profile">View Profile</router-link>
            </div>
            <div class="option">
              <router-link to="/logout" class="nav-link-logout">Logout</router-link>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false // Define showOptions property in data
    };
  },
  methods: {
    hideOptions() {
      this.showOptions = false;
    },
    cancelHideOptions() {
      // No need for timeout, canceling the hide directly
      this.showOptions = true;
    }
  }
};
</script>

<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

.nav-wrapper {
  background-color: #ffffff; /* light background for the navbar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
}

.navbar {
  display: flex;
  align-items: center; /* aligns items vertically */
  justify-content: space-between; /* keeps logo on the left and links on the right */
  padding: 20px 30px; /* consistent padding */
  margin: 0 auto;
  max-width: 1200px; /* maximum width of the nav content */
}

.logo {
  font-size: 24px; /* large size for visibility */
  font-weight: bold; /* makes the logo text bolder */
  color: #2c3e50; /* similar to nav-link color for consistency */
  text-transform: uppercase; /* transform text to uppercase */
  letter-spacing: 2px; /* add letter spacing */
}

.user-icon {
  position: relative; /* to position dropdown options */
  cursor: pointer; /* change cursor on hover */
}

.user-options {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  padding: 10px 0; /* Adjust padding for the options */
  min-width: 150px;
}

.user-icon:hover .user-options {
  display: block; /* show options on hover */
}

.option {
  padding: 10px 20px;
  transition: background-color 0.3s;
}

.option:hover {
  background-color: #f0f0f0;
}

.nav-link {
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none; /* removes underline from links */
  padding: 10px 5px; /* reduced horizontal padding */
  margin: 0 5px; /* reduced margin for closer spacing */
  transition: color 0.3s; /* smooth transition for hover effects */
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #42b983; /* highlight color on hover and active */
}

.nav-link-profile,
.nav-link-logout {
  font-family: 'Arial', sans-serif; /* Change font to match the font used for Home */
  font-weight: 500; /* Adjust font weight */
  color: #2c3e50; /* Adjust color */
  text-decoration: none; /* Remove underline */
}

.nav-link-profile:hover,
.nav-link-logout:hover {
  color: #42b983; /* Adjust hover color */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* Adjust the duration of the transition */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column; /* stacks logo and links vertically */
    justify-content: center; /* center items */
    align-items: center;
  }
  .nav-link {
    padding: 10px 15px; /* revert padding for better touch targets on mobile */
  }
}
</style>
