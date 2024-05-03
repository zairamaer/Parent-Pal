<template>
  <div class="nav-wrapper">
    <nav class="navbar">
      <div class="logo">ParentPal</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/milestone-tracker" class="nav-link">Milestone Tracker</router-link>
        <router-link to="/forum-view" class="nav-link">Forum</router-link>
        <router-link to="/analytics" class="nav-link">Analytics</router-link>
      </div>
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
      showOptions: false 
    };
  },
  methods: {
    hideOptions() {
      this.showOptions = false;
    },
    cancelHideOptions() {
      this.showOptions = true;
    }
  }
};
</script>

<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

.nav-wrapper {
  background-color: #ffffff; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.navbar {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  padding: 20px 30px; 
  margin: 0 auto;
  max-width: 1200px; 
}

.logo {
  font-size: 24px; 
  font-weight: bold; 
  color: #2c3e50; 
  text-transform: uppercase; 
  letter-spacing: 2px; 
}

.nav-links {
  display: flex;
  align-items: center;
  margin-left: 500px;
}

.nav-link {
  margin: 0 25px; 
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none; 
  transition: color 0.3s; 
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #42b983; 
}

.user-icon {
  position: relative; 
  cursor: pointer; 
}

.user-options {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  padding: 10px 0; 
  min-width: 150px;
}

.user-icon:hover .user-options {
  display: block; 
}

.option {
  padding: 10px 20px;
  transition: background-color 0.3s;
}

.option:hover {
  background-color: #f0f0f0;
}

.nav-link-profile,
.nav-link-logout {
  font-family: 'Arial', sans-serif; 
  font-weight: 500; 
  color: #2c3e50; 
  text-decoration: none; 
}

.nav-link-profile:hover,
.nav-link-logout:hover {
  color: #42b983; 
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; 
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
  }
  .nav-link {
    padding: 10px 15px; 
  }
}
</style>
