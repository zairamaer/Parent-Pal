<template>
  <div>
    <div>
      <canvas ref="chartCanvas" style="margin: 0; padding: 0;" width="400" height="200"></canvas>
      <div>
        <p>Average Milestones Per Month: {{ averageMilestonesPerMonth }}</p>
        <p>Most Common Milestone Type: {{ mostCommonMilestoneType }}</p>
      </div>
    </div>
    <div>
      <canvas ref="trendingMilestoneCanvas" style="margin: 0; padding: 0;" width="400" height="200"></canvas>
      <p>Trending Milestone</p>
    </div>
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

      const monthlyData = this.data.reduce((acc, item) => {
        const itemMonth = new Date(item.date).getMonth();
        const monthLabel = this.months[itemMonth];
        if (!acc[monthLabel]) {
          acc[monthLabel] = { physical: 0, cognitive: 0, socialEmotional: 0, languageCommunication: 0, total: 0, count: 0 };
        }
        acc[monthLabel][item.type] += item.count;
        acc[monthLabel].total += item.count;
        acc[monthLabel].count++;
        return acc;
      }, {});

      // Sort the months in chronological order
      const sortedMonths = Object.keys(monthlyData).sort((a, b) => this.months.indexOf(a) - this.months.indexOf(b));

      const chartData = {
        labels: sortedMonths, // Use sorted months as labels
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
            type: 'category',
            labels: sortedMonths // Use sorted months as labels for x-axis
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

      // Calculate and display additional analytics
      this.calculateAdditionalAnalytics(monthlyData);
    },
    calculateAdditionalAnalytics(monthlyData) {
      const monthsCount = Object.keys(monthlyData).length;
      const totalMilestones = Object.values(monthlyData).reduce((total, item) => total + item.total, 0);
      this.averageMilestonesPerMonth = totalMilestones / monthsCount;

      const milestoneTypes = ['physical', 'cognitive', 'socialEmotional', 'languageCommunication'];
      let mostCommonType = '';
      let maxCount = 0;
      for (const type of milestoneTypes) {
        const typeCount = Object.values(monthlyData).reduce((total, item) => total + item[type], 0);
        if (typeCount > maxCount) {
          maxCount = typeCount;
          mostCommonType = type;
        }
      }
      this.mostCommonMilestoneType = mostCommonType;

      // Calculate trending milestone
      let trendingMilestone = '';
      let maxIncrease = 0;
      for (const type of milestoneTypes) {
        let maxIncreaseForType = 0;
        for (let i = 1; i < this.months.length; i++) {
          const currentMonthCount = monthlyData[this.months[i]][type];
          const previousMonthCount = monthlyData[this.months[i - 1]][type];
          const increase = currentMonthCount - previousMonthCount;
          if (increase > maxIncreaseForType) {
            maxIncreaseForType = increase;
          }
        }
        if (maxIncreaseForType > maxIncrease) {
          maxIncrease = maxIncreaseForType;
          trendingMilestone = type;
        }
      }
      this.trendingMilestone = trendingMilestone;

      // Emit event to notify parent about trending milestone
      this.$emit('trending-milestone-updated', trendingMilestone);

      // Render the trending milestone graph
      this.renderTrendingMilestoneGraph(monthlyData);
    },
    renderTrendingMilestoneGraph(monthlyData) {
      const ctx = this.$refs.trendingMilestoneCanvas.getContext('2d');

      const milestoneTypes = ['physical', 'cognitive', 'socialEmotional', 'languageCommunication'];
      const datasets = milestoneTypes.map(type => {
        return {
          label: type.charAt(0).toUpperCase() + type.slice(1), // Get label from milestone type
          data: this.calculateTrendingMilestoneData(monthlyData, type),
          backgroundColor: this.getColorForMilestone(type), // Get color for milestone type
          borderColor: this.getColorForMilestone(type),
          borderWidth: 1
        };
      });

      const trendChartData = {
        labels: this.months,
        datasets: datasets
      };

      const trendChartOptions = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };

      new Chart(ctx, {
        type: 'bar',
        data: trendChartData,
        options: trendChartOptions
      });
    },
    calculateTrendingMilestoneData(monthlyData, milestoneType) {
        const trendData = [];
        for (let i = 0; i < this.months.length; i++) {
          const currentMonth = this.months[i];
          const previousMonth = this.months[i - 1];

          let currentMonthCount, previousMonthCount;

          if (i === 0) {
            currentMonthCount = monthlyData[currentMonth][milestoneType];
            trendData.push(currentMonthCount); // Record count for January
          } else {
            currentMonthCount = monthlyData[currentMonth][milestoneType];
            previousMonthCount = monthlyData[previousMonth][milestoneType];
            if (currentMonthCount !== undefined && previousMonthCount !== undefined) {
              const increase = currentMonthCount - previousMonthCount;
              trendData.push(increase);
            } else if (currentMonthCount !== undefined && previousMonthCount === undefined) {
              trendData.push(-currentMonthCount); // Record negative trend if there are milestones in the current month but none in the previous month
            } else {
              trendData.push(0);
            }
          }
        }
        return trendData;
      },

    getColorForMilestone(milestoneType) {
      switch (milestoneType) {
        case 'physical':
          return 'rgba(255, 99, 132, 0.6)';
        case 'cognitive':
          return 'rgba(54, 162, 235, 0.6)';
        case 'socialEmotional':
          return 'rgba(255, 206, 86, 0.6)';
        case 'languageCommunication':
          return 'rgba(75, 192, 192, 0.6)';
        default:
          return 'rgba(255, 99, 132, 0.6)';
      }
    }
  },
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      averageMilestonesPerMonth: 0,
      mostCommonMilestoneType: '',
      trendingMilestone: ''
    };
  }
};
</script>
