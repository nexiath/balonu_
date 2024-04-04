<template>
  <div class="moy">
    <h1>Statistiques</h1>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'BarChart',
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const urls = [
        'http://localhost:3030/stats/prix-moyen',
        'http://localhost:3030/stats/prix-minimum',
        'http://localhost:3030/stats/prix-maximum',
        'http://localhost:3030/stats/nombre-vols',
      ];
      try {
        // Exécute toutes les requêtes en parallèle
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const data = responses.map(response => response.data);

        // Extrayez les valeurs des données
        const chartData = data.map(d => {
          return Object.values(d)[0]; // Prend la première valeur de chaque objet de réponse
        });

        // Passez les données extraites à la fonction de rendu de graphique
        this.renderChart(chartData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    renderChart(data) {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Prix Moyen', 'Prix Minimum', 'Prix Maximum'],
          datasets: [{
            label: 'Statistiques des Vols',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
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
    beforeDestroy() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
  },
};
</script>

<style scoped>
.moy {
  padding-top: 10%;
}
</style>
