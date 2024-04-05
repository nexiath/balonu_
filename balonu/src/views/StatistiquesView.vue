<template>
    <div class="charts-container">


        <div class="chart-container">
            <h2>Nombre de Montgolfières Active/Inactive</h2>
            <DoughnutChart :activeCount="activeMontgolfieresCount" :inactiveCount="inactiveMontgolfieresCount" v-if="isChartDataAvailable" />
        </div>
        <div class="chart-container">
            <h2>Nombre de vols pour une date</h2>
            <LineChart :data="lineChartData" v-if="isChartDataAvailable" />
        </div>
        <div class="chart-container">
            <h2>Prix de vente pour Vol</h2>
            <canvas ref="combinedChart"></canvas>
        </div>
        <div class="chart-container">
            <h2>Top3 des stand les plus vendeur</h2>
            <canvas ref="barChart"></canvas>
        </div>
        <div class="chart-container">
            <h2>Catégories les plus en vogue</h2>
            <canvas ref="pieChart"></canvas>
        </div>
        <div class="chart-container">
            <h2>Types de Stands</h2>
            <canvas ref="donutChart"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';
import DoughnutChart from "@/components/Statistiques/DoughnutChart.vue";
import LineChart from "@/components/Statistiques/LineChart.vue";
import {mapGetters} from "vuex";

export default {
    name: 'StatistiquesView',
    components: {
        LineChart,
        DoughnutChart,
    },
    data() {
        return {
            combinedChart: null,
            barChart: null,
            pieChart: null,
            donutChart: null,
            montgolfieres: [],
            isChartDataAvailable: false,
            activeMontgolfieresCount: 0,
            inactiveMontgolfieresCount: 0,
            lineChartData: null

        };

    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
        activeMontgolfieres() {
            return this.montgolfieres.filter(montgolfiere => montgolfiere.montgolfiere_est_active);
        },
        inactiveMontgolfieres() {
            return this.montgolfieres.filter(montgolfiere => !montgolfiere.montgolfiere_est_active);
        }
    },
    methods: {
        async fetchMontgolfieres() {
            try {
                const response = await axios.get('http://localhost:3030/montgolfieres');
                this.montgolfieres = response.data;
                this.activeMontgolfieresCount = this.activeMontgolfieres.length;
                this.inactiveMontgolfieresCount = this.inactiveMontgolfieres.length;

                // Fetch data for the LineChart
                const lineChartData = await this.fetchLineChartData();
                this.lineChartData = lineChartData;

                this.isChartDataAvailable = true;
            } catch (error) {
                console.error('Erreur lors de la récupération des montgolfières:', error);
            }
        },
        async fetchData() {
            try {
                const combinedResponse = await axios.get('http://localhost:3030/stats/statistiques-combinees');
                this.renderCombinedChart(combinedResponse.data);

                // Récupérer les données pour les autres types de graphiques
                const standStatsResponse = await axios.get('http://localhost:3030/statstand/statistiques-stands');
                const topPrestatairesResponse = await axios.get('http://localhost:3030/prestastat/top-prestataires');

                // Appeler la méthode pour afficher le top 3 des prestataires avant les autres graphiques
                await this.renderTopPrestatairesChart(topPrestatairesResponse.data);

                // Maintenant, afficher les autres graphiques
                this.renderBarChart(standStatsResponse.data);
                this.renderPieChart(standStatsResponse.data);
                this.renderDonutChart(standStatsResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        },
        renderCombinedChart(data) {
            const ctx = this.$refs.combinedChart.getContext('2d');
            this.combinedChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Variation Prix de Vol'],
                    datasets: [{
                        label: 'Prix Moyen',
                        data: [data.prixMoyen],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Prix Minimum',
                        data: [data.prixMinimum],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Prix Maximum',
                        data: [data.prixMaximum],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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
        renderBarChart(data) {
            const ctx = this.$refs.barChart.getContext('2d');
            this.barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.topStands.map(stand => stand.libelle_stand),
                    datasets: [{
                        label: 'Chiffre d\'affaires par stand',
                        data: data.topStands.map(stand => stand.chiffre_affaire),
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
        async renderTopPrestatairesChart(data) {
            try {
                const ctx = this.$refs.topPrestatairesChart.getContext('2d');
                this.topPrestatairesChart = new Chart(ctx, {
                    type: 'line', // Changement du type de graphique en "ligne"
                    data: {
                        labels: data.map(prestataire => prestataire.nom + ' ' + prestataire.prenom),
                        datasets: [{
                            label: 'Nombre de vues',
                            data: data.map(prestataire => prestataire.nombre_vues),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: false // Ne pas remplir la zone sous la ligne
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
            } catch (error) {
                console.error('Erreur lors de la récupération du top 3 des prestataires:', error);
            }
        },


        renderPieChart(data) {
            const ctx = this.$refs.pieChart.getContext('2d');
            this.pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.topProducts.map(product => product.libelle_produit),
                    datasets: [{
                        label: 'Nombre de ventes par produit',
                        data: data.topProducts.map(product => product.nombre_ventes),
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
                    labels: data.topCategories.map(category => category.libelle_categorie_stand),
                    datasets: [{
                        label: 'Chiffre d\'affaires par catégorie',
                        data: data.topCategories.map(category => category.chiffre_affaire),
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
            if (this.combinedChart) {
                this.combinedChart.destroy();
            }
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
        async fetchLineChartData() {
            try {
                // Fetch flight data from the API endpoint
                const response = await axios.get('http://localhost:3030/montgolfieres');

                // Extracting dates and flight counts for the next 7 days
                const currentDate = new Date();
                const startDate = new Date(currentDate);
                startDate.setHours(0, 0, 0, 0); // Set the time to midnight
                const labels = [];
                const data = [];

                // Loop through the next 7 days
                for (let i = 0; i < 7; i++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + i);
                    const formattedDate = date.toISOString().split('T')[0]; // Extracting date in 'YYYY-MM-DD' format

                    // Initialize the count of flights for the date
                    let flightsOnDate = 0;

                    // Filter flights that start on or after the current date
                    response.data.forEach(montgolfiere => {
                        const flightDate = new Date(montgolfiere.date_debut);
                        if (flightDate.toISOString().split('T')[0] === formattedDate && flightDate >= startDate) {
                            flightsOnDate++;
                        }
                    });

                    labels.push(formattedDate);
                    data.push(flightsOnDate);
                }

                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Nombre de vols par jours',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            data: data
                        }
                    ]
                };
            } catch (error) {
                console.error('Error fetching LineChart data:', error);
                return null;
            }
        }
    },
    mounted() {
        this.fetchMontgolfieres();
        this.fetchData();

    },
};
</script>

<style scoped>
.charts-container {
    padding-top: 10%;
    padding-bottom: 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.chart-container {
    flex-basis: 45%; /* Pour afficher deux graphiques par ligne */
    padding-top: 20px;
    position: relative;
    height: 400px;
    margin-bottom: 20px;
}

.chart-container h2 {
    text-align: center;
}
</style>