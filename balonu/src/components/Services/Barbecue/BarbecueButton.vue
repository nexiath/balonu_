<template>
  <div class="payment-button">
    <button @click="proceedToPayment">Procéder au paiement</button>
  </div>
</template>

<script>
export default {
  name: 'BarbecueButton',
  methods: {
    proceedToPayment() {
      console.log('Procéder au paiement...');
    }
  }
}
</script>

<style>
.payment-button {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-family: 'Poppins', 'Arial';
}

.payment-button button {
  padding: 12px 25px;
  background-color: #f30000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.payment-button button:hover {
  background-color: #FF7849;
  transform: translateY(-3px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

</style>
