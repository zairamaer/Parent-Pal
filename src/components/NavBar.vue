<template>
  <div class="nav-wrapper">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/milestone-tracker" class="nav-link">Milestone Tracker</router-link>
      <router-link to="/forum-view" class="nav-link">Forum</router-link>
    </nav>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

.nav-wrapper {
  background-color: #fff; /* light background for the navbar */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* subtle shadow for depth */
}

.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 20px 30px; /* consistent padding */
  margin: 0 auto;
  max-width: 1200px; /* maximum width of the nav content */
}

.nav-link {
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none; /* removes underline from links */
  padding: 10px 15px; /* padding for larger clickable area */
  margin: 0 10px; /* balanced spacing between links */
  transition: color 0.3s; /* smooth transition for hover effects */
}

.nav-link:hover, .nav-link.router-link-exact-active {
  color: #42b983; /* highlight color on hover and active */
}

@media (max-width: 768px) {
  .navbar {
    justify-content: center; /* center items on smaller screens */
  }
}
</style>
