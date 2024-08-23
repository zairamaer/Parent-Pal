<template>
  <Navbar /> <!-- Include the navigation bar component here -->
  <div class="profile-container">
    <div class="profile-page">
      <!-- Left Section -->
      <div class="left-section">
        <h2>Profile</h2>
        <ul class="profile-menu">
          <li @click="showSection('info')">Profile Info</li>
          <li @click="showSection('changePassword')">Change Password</li>
        </ul>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <div v-if="currentSection === 'info'">
          <h2>User Details</h2>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="user.name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="user.username">
          </div>
          <button @click="saveChanges">Save Changes</button>
        </div>

        <div v-if="currentSection === 'changePassword'">
          <h2>Change Password</h2>
          <div class="form-group">
            <label for="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" v-model="currentPassword">
          </div>
          <div class="form-group">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="newPassword">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword">
          </div>
          <button @click="changePassword">Change Password</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Navbar from '@/components/NavBar.vue'; 

export default {
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      },
      currentSection: 'info', // default section to show
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  components: {
    Navbar, // Register the Navbar component
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    saveChanges() {
      // Handle profile update logic here
      alert('Profile information updated successfully!');
    },
    changePassword() {
      // Handle password change logic here
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match.');
        return;
      }
      if (this.newPassword.length < 6) {
        alert('New password must be at least 6 characters long.');
        return;
      }
      
      // Simulated backend request to change password
      setTimeout(() => {
        alert('Password changed successfully!');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }, 1000); // Simulating 1 second delay
    }
  }
};
</script>



<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 50px;
  font-family: 'Arial', sans-serif;
}

.profile-page {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.left-section {
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  border-radius: 10px 0 0 10px;
}

.left-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.profile-menu {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.profile-menu li {
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
  font-size: 1.1rem;
  font-weight: 400; /* Default font weight */
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.profile-menu li:hover,
.profile-menu li.active {
  color: black;
  transform: scale(1.02);
}

.profile-menu li:not(.active):hover {
  background-color: #e0e0e0;
  transform: scale(1.02);
}

.profile-menu li.active {
  font-weight: 700; /* Bold text for active item */
}

.right-section {
  flex: 2;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 0 10px 10px 0;
}

.right-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

button:active {
  transform: scale(0.98);
}
</style>



