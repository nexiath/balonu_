<template>
  <div class="payment-method">
    <h2>Choisissez votre moyen de paiement</h2>

    <div v-for="method in methods" :key="method">
      <input type="radio" :id="method" v-model="selectedMethod" :value="method">
      <label :for="method">{{ method }}</label>
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