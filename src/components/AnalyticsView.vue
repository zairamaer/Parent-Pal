<template>
  <div>
    <Navbar />
    <div class="analytics-container">
      <h2>Analytics Overview</h2>
      <div class="analytics-summary">
        <div class="summary-item">
          <h3>Total Milestones</h3>
          <p>{{ totalMilestones }}</p>
        </div>
        <div class="summary-item">
          <h3>Physical Milestones</h3>
          <p>{{ physicalMilestones }}</p>
        </div>
        <div class="summary-item">
          <h3>Cognitive Milestones</h3>
          <p>{{ cognitiveMilestones }}</p>
        </div>
        <div class="summary-item">
          <h3>Social/Emotional Milestones</h3>
          <p>{{ socialEmotionalMilestones }}</p>
        </div>
        <div class="summary-item">
          <h3>Language/Communication Milestones</h3>
          <p>{{ languageCommunicationMilestones }}</p>
        </div>
      </div>
      <AnalyticsChart :data="milestonesData" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'; 
import AnalyticsChart from '@/components/AnalyticsChart.vue'; 

export default {
  components: {
    Navbar, 
    AnalyticsChart 
  },
  data() {
return {
  selectedMonth: null,
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  milestonesData: [
    { type: 'socialEmotional', count: 10, date: '2024-01-01' },
    { type: 'cognitive', count: 8, date: '2024-04-15' },
    { type: 'languageCommunication', count: 7, date: '2025-05-30' },
    { type: 'cognitive', count: 5, date: '2024-01-10' },
    { type: 'socialEmotional', count: 12, date: '2024-02-20' },
    { type: 'cognitive', count: 6, date: '2024-03-05' },
    { type: 'physical', count: 9, date: '2024-04-20' },
    { type: 'languageCommunication', count: 7, date: '2024-05-10' },
    { type: 'physical', count: 11, date: '2024-06-25' },
    { type: 'cognitive', count: 8, date: '2024-07-15' },
    { type: 'physical', count: 6, date: '2024-08-30' },
    { type: 'socialEmotional', count: 9, date: '2024-09-05' },
    { type: 'physical', count: 8, date: '2024-10-12' },
    { type: 'languageCommunication', count: 7, date: '2024-11-20' },
    { type: 'physical', count: 10, date: '2024-12-01' },
    { type: 'cognitive', count: 8, date: '2025-01-15' },
    { type: 'socialEmotional', count: 7, date: '2025-02-28' },
    { type: 'languageCommunication', count: 6, date: '2025-03-10' },
    { type: 'physical', count: 9, date: '2025-04-20' },
    { type: 'cognitive', count: 7, date: '2025-05-05' },
    { type: 'socialEmotional', count: 5, date: '2025-05-12' }, 
    { type: 'languageCommunication', count: 4, date: '2025-06-02' } 
  ],
  totalMilestones: 0,
      physicalMilestones: 0,
      cognitiveMilestones: 0,
      socialEmotionalMilestones: 0,
      languageCommunicationMilestones: 0
  };
  },
  mounted() {
    this.calculateAnalytics();
  },
    methods: {
    calculateAnalytics() {
      this.totalMilestones = this.milestonesData.reduce((total, item) => total + item.count, 0);
      this.physicalMilestones = this.milestonesData.filter(item => item.type === 'physical').reduce((total, item) => total + item.count, 0);
      this.cognitiveMilestones = this.milestonesData.filter(item => item.type === 'cognitive').reduce((total, item) => total + item.count, 0);
      this.socialEmotionalMilestones = this.milestonesData.filter(item => item.type === 'socialEmotional').reduce((total, item) => total + item.count, 0);
      this.languageCommunicationMilestones = this.milestonesData.filter(item => item.type === 'languageCommunication').reduce((total, item) => total + item.count, 0);
    }
  }

};
</script>

<style scoped>
.analytics-container {
  max-width: 800px;
  margin: 2rem auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.analytics-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-item {
  flex: 1;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.summary-item h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}
</style>
