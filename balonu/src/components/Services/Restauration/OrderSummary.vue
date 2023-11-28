<template>
  <div>
    <ProductList @addToCart="handleAddToCart" />
    <ShoppingList :items="cartItems" />
  </div>
</template>

<script>
data() {
  return {
    cartItems: []
  }
};
methods: {
  handleAddToCart(product) {
    const foundItem = this.cartItems.find(item => item.id === product.id);
    if (foundItem) {
      foundItem.totalQuantity += product.totalQuantity;
    } else {
      this.cartItems.push(product);
    }
  }
}
</script>
