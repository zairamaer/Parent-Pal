<template>
    <div class="signup-container">
      <div class="signup-page">
        <div class="left-section">
          <img src="logo.png" alt="Logo of your application" class="logo">
        </div>
        <div class="right-section">
          <h2>Sign Up</h2>
          <form @submit.prevent="signup">
            <div class="form-group">
              <label for="newUsername">Username:</label>
              <input type="text" id="newUsername" v-model="newUsername">
              <p v-if="usernameError" class="error">{{ usernameError }}</p>
            </div>
            <div class="form-group">
              <label for="newPassword">Password:</label>
              <input type="password" id="newPassword" v-model="newPassword">
              <p v-if="passwordError" class="error">{{ passwordError }}</p>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p class="login-link">Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUsername: '',
        newPassword: '',
        usernameError: '',
        passwordError: ''
      };
    },
    methods: {
      signup() {
        // Reset errors
        this.usernameError = '';
        this.passwordError = '';
  
        // Validate username
        if (this.newUsername.length === 0) {
          this.usernameError = 'Please enter a username';
          return;
        }
  
        // Validate password
        if (this.newPassword.length < 6) {
          this.passwordError = 'Password must be at least 6 characters';
          return;
        }
  
        // Simulated backend: Check if username already exists
        // Simulating delay with setTimeout
        setTimeout(() => {
          if (this.newUsername === 'existingUser') {
            this.usernameError = 'Username already exists';
          } else {
            alert('Sign up successful!');
            // You can navigate to login page or any other page after successful sign up
          }
        }, 1000); // Simulating 1 second delay
      }
    }
  }
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 130px;
  }
  
  .signup-page {
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
  
  .login-link {
    margin-top: 20px;
    text-align: center;
  }
  
  .login-link a {
    color: #4267B2;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  .error {
    color: red;
    margin-top: 5px;
  }
  </style>