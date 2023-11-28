<template>
  <div id="root">
      <RestaurationHeader />
    <div id="app">
      <StandsView/>
      <!-- <ProductList @addToCart="handleAddToCart" />
      <ShoppingCart :items="cartItems" @remove-item="removeItem"/> -->
    </div>
  </div>
</template>

<script>
// import ProductList from '@/components/Services/Restauration/ProductList.vue';
// import ShoppingCart from '@/components/Services/Restauration/ShoppingCart.vue';
import RestaurationHeader from "@/components/Services/Restauration/RestaurationHeader.vue";
import StandsView from "@/components/Services/Restauration/StandsView.vue";

export default {
  name: 'RestaurationView',
  components: {
    RestaurationHeader,
    // ProductList,
    // ShoppingCart,
    StandsView
  },
  data() {
    return {
      cartItems: []
    };
  },
  methods: {
    handleAddToCart(product) {
      const foundItem = this.cartItems.find(item => item.id === product.id);
      if (foundItem) {
        foundItem.totalQuantity += product.quantity;
        foundItem.quantity += product.totalQuantity;
      } else {
        this.cartItems.push({
          ...product,
          totalQuantity: product.quantity
        });
      }
      this.calculateTotalPrice();
    },
    removeItem(item) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.calculateTotalPrice();
      }
    },
    calculateTotalPrice() {
      this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  }

}
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
}

#top, #pq {
  margin: 0;
  padding: 0;
}

</style>
