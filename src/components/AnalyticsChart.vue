<template>
  <div>
    <canvas ref="chartCanvas" style="margin: 0; padding: 0;" width="400" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['data'],
  mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Grouping data by month
      const monthlyData = this.data.reduce((acc, item) => {
        const itemMonth = new Date(item.date).getMonth();
        const monthLabel = this.months[itemMonth];
        if (!acc[monthLabel]) {
          acc[monthLabel] = { physical: 0, cognitive: 0, socialEmotional: 0, languageCommunication: 0 };
        }
        acc[monthLabel][item.type] += item.count;
        return acc;
      }, {});

      const chartData = {
        labels: Object.keys(monthlyData),
        datasets: [
          {
            label: 'Physical Milestones',
            data: Object.values(monthlyData).map(item => item.physical),
            borderColor: '#FF6384',
            fill: false
          },
          {
            label: 'Cognitive Milestones',
            data: Object.values(monthlyData).map(item => item.cognitive),
            borderColor: '#36A2EB',
            fill: false
          },
          {
            label: 'Social/Emotional Milestones',
            data: Object.values(monthlyData).map(item => item.socialEmotional),
            borderColor: '#FFCE56',
            fill: false
          },
          {
            label: 'Language/Communication Milestones',
            data: Object.values(monthlyData).map(item => item.languageCommunication),
            borderColor: '#4BC0C0',
            fill: false
          }
        ]
      };

      const chartOptions = {
        scales: {
          x: {
            type: 'category'
          },
          y: {
            beginAtZero: true
          }
        }
      };

      this.chartInstance = new Chart(this.$refs.chartCanvas.getContext('2d'), {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }
  },
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
  }
};
</script>
