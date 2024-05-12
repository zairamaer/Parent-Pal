<template>
  <Navbar /> <!-- Include the navigation bar component here -->
  <div class="home">
    <div class="content">
      <h1>Welcome to ParentPal</h1>
      <p class="subtitle">Empowering Parents, Supporting Families</p>
      
      <div class="features">
        <div class="feature">
          <img src="/assets/feature1.svg" alt="Feature 1 Icon">
          <h2>Expert Advice</h2>
          <p>Access a wealth of expert advice and tips from seasoned parenting professionals to navigate the journey of parenthood with confidence.</p>
        </div>
        
        <div class="feature">
          <img src="/assets/feature2.svg" alt="Feature 2 Icon">
          <h2>Community Support</h2>
          <p>Connect with other parents facing similar challenges, share experiences, and find solidarity in our supportive community forum.</p>
        </div>
        
        <div class="feature">
          <img src="/assets/feature3.svg" alt="Feature 3 Icon">
          <h2>Personalized Resources</h2>
          <p>Receive personalized recommendations and curated resources tailored to your family's unique needs and preferences.</p>
        </div>
      </div>
      
      <div class="additional-content">
        <h2>Why Choose ParentPal?</h2>
        <p>ParentPal is committed to providing comprehensive support for parents and families. Here are some reasons why you should choose us:</p>
        <ul>
          <li>Trusted by millions of parents worldwide</li>
          <li>Diverse range of expert advice and resources</li>
          <li>Engaging community forum for sharing experiences</li>
          <li>Personalized recommendations tailored to your family's needs</li>
        </ul>
      </div>
      
      <div class="cta">
        <button>Get Started</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'; 

export default {
  components: {
    Navbar, // Register the Navbar component
  },
  name: 'HomeView',
}
</script>

<style scoped>
.content {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333; 
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666; 
}

.features {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 3rem;
}

.feature {
  flex: 1 1 calc(33.333% - 20px);
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: transform 0.3s ease, background-color 0.3s;
  cursor: pointer;
}

.feature:hover {
  transform: translateY(-5px);
  background-color: #e6f7ec;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature p {
  font-size: 1rem;
  color: #666;
}

.additional-content {
  margin-top: 50px;
}

.additional-content h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.additional-content p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #666;
}

.additional-content ul {
  text-align: left;
  margin-left: 20px;
}

.additional-content ul li {
  margin-bottom: 0.5rem;
  color: #666;
}

.cta {
  margin-top: 2rem;
}

.cta button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta button:hover {
  background-color: #2d7f5e;
}

@media screen and (max-width: 768px) {
  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>