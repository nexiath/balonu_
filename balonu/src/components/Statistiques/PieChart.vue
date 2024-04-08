<template>
  <div class="stats">
    <h1>Statistiques des Stands</h1>
    <div class="chart-container">
      <canvas ref="barChart"></canvas>
    </div>
    <div class="chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
    <div class="chart-container">
      <canvas ref="donutChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'PieChart',
  data() {
    return {
      barChart: null,
      pieChart: null,
      donutChart: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = 'http://localhost:3030/statstand/statistiques-stands';
      try {
        const response = await axios.get(url);
        const data = response.data;

        // Extrait les données pour chaque type de graphique
        const barChartData = data.topStands.map(stand => stand.chiffre_affaire);
        const pieChartData = data.topProducts.map(product => product.nombre_ventes);
        const donutChartData = data.topCategories.map(category => category.chiffre_affaire);

        // Rendu des graphiques
        this.renderBarChart(barChartData);
        this.renderPieChart(pieChartData);
        this.renderDonutChart(donutChartData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    renderBarChart(data) {
      const ctx = this.$refs.barChart.getContext('2d');
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((_, index) => `Stand ${index + 1}`),
          datasets: [{
            label: 'Chiffre d\'affaires par stand',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    renderPieChart(data) {
      const ctx = this.$refs.pieChart.getContext('2d');
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map((_, index) => `Produit ${index + 1}`),
          datasets: [{
            label: 'Nombre de ventes par produit',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    renderDonutChart(data) {
      const ctx = this.$refs.donutChart.getContext('2d');
      this.donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map((_, index) => `Catégorie ${index + 1}`),
          datasets: [{
            label: 'Chiffre d\'affaires par catégorie',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    beforeDestroy() {
      if (this.barChart) {
        this.barChart.destroy();
      }
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      if (this.donutChart) {
        this.donutChart.destroy();
      }
    },
  },
};
</script>

<style scoped>
.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.chart-container {
  width: 400px;
  margin: 20px;
}
</style>
