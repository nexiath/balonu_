<template>
    <div>
        hello
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0', '#9966FF'],
                    },
                ],
            },
            chartOptions: {
                // ... Vos options de graphique
            },
        };
    },

};
</script>

<style scoped>
/* Ajoutez vos styles au besoin */
</style>
