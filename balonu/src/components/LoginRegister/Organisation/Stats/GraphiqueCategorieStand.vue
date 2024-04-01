<template>
    <div>
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    props: ['data'],
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.chart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'doughnut',
                data: this.data,
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