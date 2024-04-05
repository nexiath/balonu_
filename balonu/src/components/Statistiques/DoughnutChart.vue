<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: ['activeCount', 'inactiveCount'],
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'Inactive'],
          datasets: [
            {
              data: [this.activeCount, this.inactiveCount],
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)', // Blue color for Active
                'rgba(255, 99, 132, 0.5)', // Red color for Inactive
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
        this.renderChart();
      }
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
