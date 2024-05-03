<template>
  <Navbar /> <!-- Include the navigation bar component here -->
  <div class="parental-support-forum">
    <!-- New Post Form -->
    <div class="new-post-form">
      <h2>Create New Post</h2>
      <form @submit.prevent="createNewPost">
        <div class="form-group">
          <textarea v-model="newPost.content" placeholder="What's on your mind?" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="post-image">Upload Image:</label>
          <input type="file" id="post-image" accept="image/*" @change="handleImageUpload">
        </div>
        <button type="submit">Post</button>
      </form>
    </div>

    <!-- Forum Posts -->
    <div class="forum-posts">
      <div v-if="forumPosts.length > 0" class="post-container">
        <div v-for="(post, index) in forumPosts" :key="index" class="forum-post">
          <div class="post-header">
            <img src="https://via.placeholder.com/40" alt="User Avatar" class="avatar">
            <div class="post-meta">
              <span class="post-author">Anonymous</span>
              <span class="post-date">{{ post.date }}</span>
              <button @click="openEditModal(post)">Edit</button> 
              <button @click="deletePost(index)">Delete</button> 
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
            <div v-if="post.image" class="clickable-image" @click="openImage(post.image)">
              <img :src="post.image" alt="Uploaded Image" class="post-image">
            </div>
          </div>
          <!-- Comment Form -->
          <div class="comment-form">
            <h3>Add Comment</h3>
            <form @submit.prevent="addComment(post)">
              <div class="form-group">
                <textarea v-model="newComment[index].content" placeholder="Your Comment" rows="2" required></textarea>
              </div>
              <button type="submit">Comment</button>
            </form>
          </div>
          <!-- Comments -->
          <div class="comments">
            <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="comment">
              <img src="https://via.placeholder.com/40" alt="User Avatar" class="avatar">
              <div class="comment-content">
                <span class="comment-author">Anonymous</span>
                <span class="comment-date">{{ comment.date }}</span>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-posts">No posts yet. Be the first to share!</div>
    </div>

    <!-- Edit Post Modal -->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Post</h2>
        <form @submit.prevent="saveEditedPost">
          <div class="form-group">
            <textarea v-model="editedPostContent" placeholder="Edit your post" rows="3" required></textarea>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
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
      forumPosts: [],
      newPost: {
        content: '',
        image: null
      },
      newComment: [],
      showEditModal: false,
      editedPostContent: '',
      editedPostIndex: null
    };
  },
  methods: {
    createNewPost() {
      if (this.newPost.content.trim()) {
        const currentDate = new Date().toLocaleDateString();
        const newPost = {
          author: 'Anonymous',
          content: this.newPost.content,
          image: this.newPost.image,
          date: currentDate,
          comments: []
        };
        this.forumPosts.unshift(newPost);
        // Clear form fields after submission
        this.newPost.content = '';
        this.newPost.image = null;
        this.newComment.push({ content: '' }); // Add empty comment object
        
        // Clear file input value
        const fileInput = document.getElementById('post-image');
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        alert('Please fill in all fields.');
      }
    },
    addComment(post) {
      const index = this.forumPosts.indexOf(post); // Get index of the current post
      const newComment = this.newComment[index]; // Get the corresponding newComment object
      if (newComment.content.trim()) {
        const currentDate = new Date().toLocaleDateString();
        const comment = {
          author: 'Anonymous',
          content: newComment.content,
          date: currentDate
        };
        post.comments.unshift(comment);
        // Clear form field after submission
        newComment.content = '';
      } else {
        alert('Please fill in all fields.');
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.newPost.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openImage(imageSrc) {
      window.open(imageSrc, '_blank');
    },
    openEditModal(post) {
      this.showEditModal = true;
      this.editedPostContent = post.content;
      this.editedPostIndex = this.forumPosts.indexOf(post);
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editedPostContent = '';
      this.editedPostIndex = null;
    },
    saveEditedPost() {
      if (this.editedPostContent.trim()) {
        const currentDate = new Date().toLocaleDateString();
        this.forumPosts[this.editedPostIndex].content = this.editedPostContent;
        this.forumPosts[this.editedPostIndex].date = currentDate;
        this.closeEditModal();
      } else {
        alert('Please fill in all fields.');
      }
    },
    deletePost(index) {
      if (confirm("Are you sure you want to delete this post?")) {
        this.forumPosts.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>

.parental-support-forum {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: flex;
}

.new-post-form {
  margin-top: 30px;
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.new-post-form h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

textarea,
input[type="file"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
}

input[type="file"] {
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.forum-posts {
  flex: 2;
  margin-left: 20px;
}

.post-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.forum-post {
  padding: 30px;
  border-bottom: 1px solid #ced4da;
  margin-top: 30px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-meta button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #007bff;
  margin-left: 10px;
}

.post-meta button:hover {
  text-decoration: underline;
}

.post-author {
  font-weight: bold;
}

.post-content {
  width: 100%;
  margin-top: 10px;
}

.post-image {
  display: block;
  margin-top: 10px;
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.clickable-image {
  position: relative;
}

.clickable-image .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
}

.comments {
  margin-top: 15px;
}

.comment {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 8px;
}

.comment-content {
  text-align: center;
}

.comment-author {
  font-weight: bold;
  color: #007bff;
  margin-right: 5px;
}

.comment-date {
  color: #606770;
  font-size: 12px;
  margin-left: 5px;
}

.comment-text {
  margin-top: 5px;
  font-size: 14px;
}

.no-posts {
  width: 100%;
  margin-left: 20px;
  flex: 2 1 60%;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  margin-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Modal Styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
