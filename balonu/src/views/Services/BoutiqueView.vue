<template>
  <div class="root">
    <BoutiqueHeader />
    <div id="app">
      <ProductBoutiqueList @addToCart="handleAddToCart" />
      <ShoppingBoutiqueCart :items="cartItems" @remove-item="removeItem" />
    </div>
  </div>
</template>

<script>
import BoutiqueHeader from "@/components/Services/Boutique/BoutiqueHeader.vue";
import ProductBoutiqueList from "@/components/Services/Boutique/ProductBoutiqueList.vue";
import ShoppingBoutiqueCart from "@/components/Services/Boutique/ShoppingBoutiqueCart.vue";

export default {
  name: 'BoutiqueView',
  components: {
    BoutiqueHeader,
    ProductBoutiqueList,
    ShoppingBoutiqueCart,
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

#top,
#pq {
  margin: 0;
  padding: 0;
}
</style>
