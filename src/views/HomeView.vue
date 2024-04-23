<template>
  <div class="home">
    <Navbar /> <!-- Include the navigation bar component here -->
    <!-- Hero section -->
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Welcome to ParentPal</h1>
          <p class="subtitle">Empowering parents with innovative solutions</p>
          <router-link to="/milestone-tracker" class="button is-primary">Get Started</router-link>
        </div>
      </div>
    </section>

    <!-- About section -->
    <section class="section">
      <div class="container">
        <h2 class="title is-2">About ParentPal</h2>
        <p>ParentPal is a cross-platform mobile application designed to simplify the complexities of parenting. With advanced analytics and personalized features, ParentPal empowers parents with actionable insights, practical guidance, and tools to enhance their confidence and competence in caregiving.</p>
      </div>
    </section>

    <!-- Parent-Child Interaction -->
    <section class="section">
      <div class="container">
        <h2 class="title is-2">Parent-Child Interaction Example</h2>
        <div class="parent">
          <div class="child"></div>
        </div>
        <button class="btn-toggle">Toggle Color</button>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'; // Correct the import path to match the file name


export default {
  components: {
    Navbar, // Register the Navbar component
  },
  name: 'HomeView',
  mounted() {
    const btnToggle = document.querySelector('.btn-toggle');
    const childElement = document.querySelector('.child');
    
    btnToggle.addEventListener('click', () => {
      childElement.classList.toggle('active');
    });
  }
}
</script>

<style scoped>
/* Add your custom styles here */
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: #42b983;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.child.active {
  background-color: #f39c12;
}

.btn-toggle {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-toggle:hover {
  background-color: #f39c12;
}
</style>
