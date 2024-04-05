<template>
    <div class="payment-method">
        <h2>Choisissez votre moyen de paiement</h2>

        <div v-for="method in methods" :key="method" class="payment-option">
            <input type="radio" :id="method" v-model="selectedMethod" :value="method" class="payment-radio">
            <label :for="method" class="payment-label">{{ method }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            methods: ['Carte bancaire', 'PayPal', 'Virement'],
            selectedMethod: this.value
        }
    },
    watch: {
        selectedMethod() {
            this.$emit('input', this.selectedMethod);
        }
    }
}
</script>

<style scoped>
.payment-method {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
}

.payment-option {
    margin-bottom: 10px;
}

.payment-radio {
    margin-right: 5px;
}

.payment-label {
    font-weight: bold;
    cursor: pointer;
}
</style>
