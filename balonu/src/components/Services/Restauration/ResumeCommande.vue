<template>
  <div class="order-summary">
    <h2>Récapitulatif de votre commande</h2>
    <div v-for="item in items" :key="item.id" class="order-item">
      {{ item.quantity }} x {{ item.name }}: <span class="item-price">{{ formatPrice(item.quantity * item.price) }}€</span>
    </div>
    <div class="order-total">
      Total : <span>{{ formatPrice(totalPrice) }}€</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
  },
  methods: {
    formatPrice(price) {
      return price.toFixed(2);
    }
  },
  created() {
    console.log("From Parent:", this.items);
  }
}
</script>

<style scoped>


.order-summary {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.order-item {
  margin-bottom: 10px;
}

.item-price {
  font-weight: bold;
}

.order-total {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
