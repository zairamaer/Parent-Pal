<template>
  <Navbar /> <!-- Enhanced navigation bar component -->
  <div class="container">
    <header class="header">
      <h1>Developmental Milestone Tracker</h1>
      <div class="action-buttons">
        <button @click="showForm = true" class="btn btn-primary">Add Milestone</button>
        <button @click="sortByDate" class="btn btn-secondary">{{ sortButtonText }}</button>
      </div>
    </header>

    <transition name="fade">
      <div v-if="showForm" class="modal">
        <div class="modal-content">
          <button @click="hideForm" class="close">&times;</button>
          <h2>Add New Milestone</h2>
          <form @submit.prevent="addMilestone" class="form">
            <input type="text" v-model="newMilestone.title" id="milestone-title" placeholder="Enter milestone title" required>
            <input type="date" v-model="newMilestone.date" id="milestone-date" :max="maxDate" required>
            <select v-model="newMilestone.type" id="milestone-type">
              <option value="physical">Physical</option>
              <option value="cognitive">Cognitive</option>
            </select>
            <input type="file" @change="handleImageUpload" accept="image/*">
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </transition>

      <!-- Edit milestone form -->
  <transition name="fade">
    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <button @click="cancelEdit" class="close">&times;</button>
        <h2>Edit Milestone</h2>
        <form @submit.prevent="updateMilestone" class="form">
          <input type="text" v-model="editedMilestone.title" placeholder="Enter milestone title" required>
          <input type="date" v-model="editedMilestone.date" :max="maxDate" required>
          <select v-model="editedMilestone.type">
            <option value="physical">Physical</option>
            <option value="cognitive">Cognitive</option>
          </select>
          <input type="file" @change="handleEditedImageUpload" accept="image/*">
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </transition>

    <div class="filter-section">
      <label for="milestone-type-filter">Filter by Type:</label>
      <select v-model="selectedType" id="milestone-type-filter" class="select">
        <option value="physical">Physical</option>
        <option value="cognitive">Cognitive</option>
      </select>
    </div>

    <ul class="milestone-list">
      <li v-for="(milestone, index) in filteredMilestones" :key="index">
        <article class="milestone">
          <div class="milestone-content">
            <div class="milestone-info">
              <div class="title-container">
                <h3 class="milestone-title">{{ milestone.title }}</h3>
                <time class="milestone-date">{{ formattedDate(milestone.date) }}</time>
              </div>
            </div>
            <img v-if="milestone.imageUrl" :src="milestone.imageUrl" alt="Milestone" class="milestone-image">
          </div>
          <div class="milestone-actions">
            <button @click="editMilestone(index)" class="btn btn-secondary">Edit</button>
            <button @click="deleteMilestone(index)" class="btn btn-danger">Delete</button>
          </div>
        </article>
      </li>
    </ul>


    <div v-if="showLightbox" class="lightbox" @click="closeLightbox">
      <img :src="selectedImage" alt="Milestone Image" class="lightbox-image">
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Previous</button>
      <span>{{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Next</button>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/NavBar.vue'; // Correct the import path to match the file name

export default {
  components: {
    Navbar, // Register the Navbar component
  },
  data() {
    return {
      milestones: [],
      newMilestone: { title: '', date: '', imageUrl: '', type: 'physical' },
      editedMilestone: { title: '', date: '', imageUrl: '', type: 'physical' },
      showForm: false,
      showEditForm: false,
      editIndex: null,
      showLightbox: false,
      selectedImage: '',
      currentPage: 1,
      milestonesPerPage: 10,
      sortAscending: true,
      selectedType: 'physical'
    };
  },
  computed: {
    maxDate() {
      const today = new Date().toISOString().split('T')[0];
      return today;
    },
    totalPages() {
      return Math.ceil(this.milestones.length / this.milestonesPerPage);
    },
    filteredMilestones() {
      return this.milestones.filter(milestone => milestone.type === this.selectedType);
    },
    sortButtonText() {
      return this.sortAscending ? 'Sort Oldest First' : 'Sort Newest First';
    }
  },
  methods: {
    // Method to add a new milestone
    addMilestone() {
      if (this.newMilestone.title.trim() && this.newMilestone.date.trim()) {
        this.milestones.push({ ...this.newMilestone });
        this.newMilestone.title = '';
        this.newMilestone.date = '';
        this.newMilestone.imageUrl = '';
        this.newMilestone.type = 'physical'; // Reset type to physical after adding
        this.showForm = false; // Hide the form after submission
      }
    },
    // Method to delete a milestone
    deleteMilestone(index) {
      this.milestones.splice(index, 1);
    },
    // Method to edit a milestone
    editMilestone(index) {
      this.editedMilestone = { ...this.milestones[index] };
      this.editIndex = index;
      this.showEditForm = true;
    },
    // Method to cancel editing
    cancelEdit() {
      this.showEditForm = false;
      this.editIndex = null;
    },
    // Method to update a milestone after editing
    updateMilestone() {
      if (this.editedMilestone.title.trim() && this.editedMilestone.date.trim()) {
        this.milestones.splice(this.editIndex, 1, { ...this.editedMilestone });
        this.showEditForm = false;
        this.editIndex = null;
        // Reset editedMilestone object
        this.editedMilestone = { title: '', date: '', imageUrl: '', type: 'physical' };
      }
    },
    // Method to format date
    formattedDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    // Method to handle image upload for adding a milestone
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.newMilestone.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // Method to handle image upload for editing a milestone
    handleEditedImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.editedMilestone.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // Method to show image in lightbox
    showImage(imageUrl) {
      this.selectedImage = imageUrl;
      this.showLightbox = true;
    },
    // Method to close lightbox
    closeLightbox() {
      this.showLightbox = false;
      this.selectedImage = '';
    },
    // Method to sort milestones by date
    sortByDate() {
      this.milestones.sort((a, b) => {
        return this.sortAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      });
      this.sortAscending = !this.sortAscending;
    },
    // Method to go to the next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Method to go to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Method to hide the form
    hideForm() {
      this.showForm = false;
    }
  }
};
</script>


<style scoped>
/* Modal styles */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 50px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 85%;
  position: relative;
}

.form-container {
  position: relative;
}

.close {
  color: #aaa;
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

/* End of Modal styles */

.milestone-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  text-align: center;
  color: #333;
}

.milestone-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.add-button,
.submit-button,
.delete-button,
.edit-button,
.cancel-button,
.sort-button {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.add-button:hover,
.submit-button:hover,
.delete-button:hover,
.edit-button:hover,
.cancel-button:hover,
.sort-button:hover {
  background-color: #4267B2;
}

.milestone-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.milestone-info {
  flex: 1;
}

.milestone-list {
  list-style: none;
  padding: 0;
}


.milestone-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.milestone-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.milestone-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  margin-top: 0;
}

.milestone-date {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.milestone-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.milestone-image {
  max-width: 150px;
  max-height: 150px;
  margin-right: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.milestone-actions {
  margin-left: 20px; /* Adjust spacing between content and actions */
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.expanded-image {
  max-width: 80%;
  max-height: 80%;
}

.edit-button {
  margin-right: 10px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
}

/* Sorting Button Styles */
.sort-button-container {
  position: relative;
}

.sort-button {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.sort-button:hover {
  background-color: #4267B2;
}

.container {
  max-width: 800px;
  margin: 2rem auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
}

.action-buttons button {
  margin-left: 10px;
}

.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007BFF;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

/* Milestone list and image styling */

.milestone-actions button {
  margin-right: 10px; /* Add margin between the "Edit" and "Delete" buttons */
}

.milestone-list {
  list-style: none;
  padding: 0;
}

.milestone {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center; /* Align items in a row in the center */
}

.milestone-image {
  max-width: 100px; /* Set a maximum width */
  max-height: 100px; /* Set a maximum height */
  width: auto; /* Allow the width to adjust according to the aspect ratio */
  height: auto; /* Allow the height to adjust according to the aspect ratio */
  border-radius: 5px; /* Rounded corners for the image */
  margin-left: 50px; /* Space between the image and text */
}


/* Styling for article content within a milestone for better spacing and alignment */
.milestone-info {
  flex: 1; /* Take remaining space */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
}

.title-container {
  display: flex;
  align-items: center;
}

.image-actions-container {
  display: flex;
  align-items: center;
}

.milestone-image {
  max-width: 150px;
  max-height: 150px;
  margin-right: 10px;
  border-radius: 8px;
}

.milestone-actions {
  margin-left: 20px;
}

.milestone-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  margin-top: 0;
  flex: 1; /* Allow title to grow with content */
  overflow: hidden; /* Hide overflow */
  white-space: nowrap; /* Prevent wrapping */
  text-overflow: ellipsis; /* Show ellipsis when text overflows */
  margin-left: 20px;
  align-self: flex-start; /* Align the title to the start (left) */
}

.milestone-date {
  font-size: 14px;
  color: #666;
  margin: 0; /* Reset margin for better spacing */
  margin-left:10px;
  align-self: flex-start; /* Align the title to the start (left) */
}

/* Ensure the lightbox image isn't too large */
.lightbox-image {
  max-width: 50%; /* Smaller size for better viewing experience */
  max-height: 80%;
  border-radius: 5px;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
