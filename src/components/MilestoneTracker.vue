<template>
  <Navbar /> <!-- Enhanced navigation bar component -->
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1>Developmental Milestone Tracker</h1>
      <div class="action-buttons">
        <button @click="showForm = true" class="btn btn-primary">Add Milestone</button>
        <button @click="sortByDate" class="btn btn-secondary">{{ sortButtonText }}</button>
      </div>
    </header>

<!-- Add Milestone Form -->
<transition name="fade">
  <div v-if="showForm" class="modal">
    <div class="modal-content">
      <button @click="cancelEdit" class="close">&times;</button> <!-- Modify this line -->
      <h2>Add New Milestone</h2>
      <form @submit.prevent="addMilestone" class="form">
        <input type="text" v-model="newMilestone.title" id="milestone-title" placeholder="Enter milestone title" required>
        <input type="date" v-model="newMilestone.date" id="milestone-date" :max="maxDate" required>
        <select v-model="newMilestone.type" id="milestone-type">
          <option value="physical">Physical</option>
          <option value="cognitive">Cognitive</option>
          <option value="social_emotional">Social/Emotional</option>
          <option value="language_communication">Language/Communication</option>
        </select>
        <select v-model="newMilestone.month" id="milestone-month">
          <option value="2">2 Months</option>
          <option value="4">4 Months</option>
          <option value="6">6 Months</option>
          <option value="9">9 Months</option>
        </select>
        <input type="file" @change="handleImageUpload" accept="image/*">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</transition>

    <!-- Edit Milestone Form -->
    <transition name="fade">
      <div v-if="showEditForm" class="modal">
        <div class="modal-content">
          <button @click="cancelEdit" class="close">&times;</button>
          <h2>Edit Milestone</h2>
          <form @submit.prevent="updateMilestone" class="form">
            <input type="text" v-model="editedMilestone.title" placeholder="Enter milestone title" required>
            <input type="date" v-model="editedMilestone.date" :max="maxDate">
            <select v-model="editedMilestone.type">
              <option value="physical">Physical</option>
              <option value="cognitive">Cognitive</option>
              <option value="social_emotional">Social/Emotional</option>
              <option value="language_communication">Language/Communication</option>
            </select>
            <select v-model="editedMilestone.month">
              <option value="2">2 Months</option>
              <option value="4">4 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
            </select>
            <input type="file" @change="handleEditedImageUpload" accept="image/*">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Filter Section -->
    <div class="filter-section">
      <label for="milestone-type-filter">Filter by Type:</label>
      <select v-model="selectedType" id="milestone-type-filter" class="select">
        <option value="physical">Physical</option>
        <option value="cognitive">Cognitive</option>
        <option value="social_emotional">Social/Emotional</option>
        <option value="language_communication">Language/Communication</option>
      </select>
    </div>

    <!-- Milestones per Month Dropdown -->
    <div class="filter-section">
      <label for="milestone-month-filter">Filter by Month:</label>
      <select v-model="selectedMonth" id="milestone-month-filter" class="select">
        <option value="">All</option>
        <option value="2">2 Months</option>
        <option value="4">4 Months</option>
        <option value="6">6 Months</option>
        <option value="9">9 Months</option>
      </select>
    </div>

    <!-- Milestone List -->
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

    <!-- Lightbox -->
    <div v-if="showLightbox" class="lightbox" @click="closeLightbox">
      <img :src="selectedImage" alt="Milestone Image" class="lightbox-image">
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Previous</button>
      <span>{{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Next</button>
    </div>

    <!-- More Information -->
    <div class="more-info">
      <p>For more information about developmental milestones, visit the CDC website:</p>
      <a href="https://www.cdc.gov/ncbddd/actearly/milestones/milestones-2mo.html" target="_blank" rel="noopener noreferrer">CDC Milestones</a>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'; 

export default {
  components: {
    Navbar, // Register the Navbar component
  },
  data() {
    return {
      newMilestones: [],
      newMilestone: { title: '', date: '', imageUrl: '', type: 'physical', month: '' },
      editedMilestone: { title: '', date: '', imageUrl: '', type: 'physical', month: '' },
      showForm: false,
      showEditForm: false,
      editIndex: null,
      showLightbox: false,
      selectedImage: '',
      currentPage: 1,
      milestonesPerPage: 10,
      sortAscending: true,
      selectedType: 'physical',
      selectedMonth: ''
    };
  },
  computed: {
    maxDate() {
      const today = new Date().toISOString().split('T')[0];
      return today;
    },
    totalPages() {
      return Math.ceil(this.newMilestones.length / this.milestonesPerPage);
    },
    filteredMilestones() {
      return this.newMilestones.filter(milestone =>
        (milestone.type === this.selectedType || this.selectedType === 'all') &&
        (this.selectedMonth === '' || milestone.month == this.selectedMonth)
      );
    },
    sortButtonText() {
      return this.sortAscending ? 'Sort Oldest First' : 'Sort Newest First';
    }
  },
  methods: {
    addMilestone() {
      if (this.newMilestone.title.trim() && this.newMilestone.date.trim()) {
        this.newMilestones.push({ ...this.newMilestone, fromNew: true });
        this.newMilestone = { title: '', date: '', imageUrl: '', type: 'physical', month: '' };
        this.showForm = false;
      }
    },
    deleteMilestone(index) {
      this.newMilestones.splice(index, 1);
    },
    editMilestone(index) {
      this.editIndex = index;
      const milestoneToEdit = this.newMilestones[index];
      
      if (milestoneToEdit.fromNew) {
        this.editedMilestone = { ...milestoneToEdit };
      } else {
        const originalMilestone = this.newMilestones.find(milestone => 
          milestone.title === milestoneToEdit.title && 
          milestone.type === milestoneToEdit.type && 
          milestone.month === milestoneToEdit.month
        );
        
        this.editedMilestone = { ...originalMilestone };
      }

      this.showEditForm = true;
    },
    cancelEdit() {
      this.newMilestone = { title: '', date: '', imageUrl: '', type: 'physical', month: '' };
      this.editedMilestone = { title: '', date: '', imageUrl: '', type: 'physical', month: '' };
      this.showForm = false;
      this.showEditForm = false;
      this.editIndex = null;
    },
    updateMilestone() {
      if (this.editedMilestone.title.trim() && this.editedMilestone.date.trim()) {
        if (!this.editedMilestone.fromNew) {
          const originalIndex = this.newMilestones.findIndex(milestone =>
            milestone.title === this.newMilestones[this.editIndex].title &&
            milestone.type === this.newMilestones[this.editIndex].type &&
            milestone.month === this.newMilestones[this.editIndex].month
          );

          if (originalIndex !== -1) {
            this.newMilestones.splice(originalIndex, 1, { ...this.editedMilestone });
          }
        } else {
          const newIndex = this.newMilestones.findIndex(milestone =>
            milestone.title === this.newMilestones[this.editIndex].title &&
            milestone.type === this.newMilestones[this.editIndex].type &&
            milestone.month === this.newMilestones[this.editIndex].month
          );

          if (newIndex !== -1) {
            this.newMilestones.splice(newIndex, 1, { ...this.editedMilestone, fromNew: true });
          }
        }

        this.showEditForm = false;
        this.editIndex = null;
      }
    },
    sortByDate() {
      this.sortAscending = !this.sortAscending;
      this.newMilestones.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return this.sortAscending ? dateA - dateB : dateB - dateA;
      });
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newMilestone.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },
    handleEditedImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editedMilestone.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },
    formattedDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    closeLightbox() {
      this.showLightbox = false;
      this.selectedImage = '';
    }
  }
};
</script>

<style scoped>

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
  margin-left: 20px; 
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

.milestone-actions button {
  margin-right: 10px; 
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
  align-items: center; 
}

.milestone-image {
  max-width: 100px; 
  max-height: 100px; 
  width: auto; 
  height: auto; 
  border-radius: 5px; 
  margin-left: 50px;
}

.milestone-info {
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
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
  flex: 1; 
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
  margin-left: 20px;
  align-self: flex-start; 
}

.milestone-date {
  font-size: 14px;
  color: #666;
  margin: 0; 
  margin-left:10px;
  align-self: flex-start; 
}


.lightbox-image {
  max-width: 50%; 
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

.more-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.more-info p {
  margin-bottom: 10px;
}

.more-info a {
  color: #007bff;
  text-decoration: none;
}

.more-info a:hover {
  text-decoration: underline;
}
</style>
