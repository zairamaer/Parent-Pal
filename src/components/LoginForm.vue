<template>
  <div class="login-container">
    <div class="login-page">
      <div class="left-section">
        <img src="logo.png" alt="Logo" class="logo">
      </div>
      <div class="right-section">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" >
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" >
          </div>
          <button type="submit">Login</button>
        </form>
        <p class="signup-link">Not signed up? <router-link to="/signup">Sign up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

.login-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 130px;
}


.login-page {
  display: flex;
}


.left-section {
  flex: 1;
  background-color: #4267B2;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #ccc;
  border-radius: 0; 
  border-top-left-radius: 10px; 
  border-bottom-left-radius: 10px; 
}

.logo {
  max-width: 100%;
  height: auto;
}


.right-section {
flex: 1;
background-color: #fff;
padding: 40px;
border-right: 1px solid #ccc;
border-top: 1px solid #ccc;
border-bottom: 1px solid #ccc;
border-radius: 0; 
border-top-right-radius: 10px; 
border-bottom-right-radius: 10px; 
}


.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #4267B2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #365899;
}


.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-link a {
  color: #4267B2;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
