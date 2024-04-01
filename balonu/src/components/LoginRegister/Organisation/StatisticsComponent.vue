<template>
    <div>
        <graphique-categorie-stand :data="standChartData" />
    </div>
</template>

<script>
import GraphiqueCategorieStand from "@/components/LoginRegister/Organisation/Stats/GraphiqueCategorieStand.vue";
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    components: {
        'graphique-categorie-stand': GraphiqueCategorieStand,
    },
    computed: {
        ...mapGetters('standsEmplacements', ['getBoutiqueStandCount', 'getRestaurantStandCount']),
        ...mapState('standsEmplacements', ['boutiqueStandCount', 'restaurantStandCount']),
    },
    data() {
        return {
            standChartData: {
                labels: ['Boutiques', 'Restaurants'],
                datasets: [
                    {
                        data: [], // Initialize with the actual data
                        backgroundColor: ['#36A2EB', '#FF6384'], // You can change colors as needed
                    },
                ],
            },
        };
    },
    methods: {
        ...mapActions('standsEmplacements', ['fetchBoutiqueCount', 'fetchRestaurantCount']),
        async fetchData() {
            try {
                // You can call your action functions here
                await this.fetchBoutiqueCount();
                await this.fetchRestaurantCount();

                console.log('Boutique Stand Count:', this.boutiqueStandCount.numberOfBoutiques);
                console.log('Restaurant Stand Count:', this.restaurantStandCount.numberOfRestaurants);

                this.standChartData.datasets[0].data = [this.boutiqueStandCount.numberOfBoutiques, this.restaurantStandCount.numberOfRestaurants];


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
    mounted() {
        this.fetchData();
    },
    updated() {
        // Update the chart data after the component has been updated
        this.standChartData.datasets[0].data = [this.boutiqueStandCount.numberOfBoutiques, this.restaurantStandCount.numberOfRestaurants];
    },
};
</script>

<style scoped>
h2 {
    margin-top: 10em;
}
</style>
