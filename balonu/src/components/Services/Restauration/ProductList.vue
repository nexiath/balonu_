<template>
  <div>

    <div class="top">
      <h2> <strong> Liste de nos burgers :</strong></h2>
    </div>

    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img class="product-image" :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <span class="product-price">{{ product.price }}€</span>
        <div class="quantity-control">
          <button @click="decreaseQuantity(product)">-</button>
          <span>{{ product.quantity }}</span>
          <button @click="increaseQuantity(product)">+</button>
        </div>
        <button class="add-button" @click="addToCart(product)">Ajouter</button>
      </div>
    </div>

    <div class="top">
      <h2> <strong> Liste de nos boissons :</strong></h2>
    </div>

    <div class="product-list">
      <div v-for="drink in drinks" :key="drink.id" class="product-card">
        <img class="product-image" :src="drink.image" :alt="drink.name" />
        <h3>{{ drink.name }}</h3>
        <span class="product-price">{{ drink.price }}€</span>
        <div class="quantity-control">
          <button @click="decreaseQuantity(drink)">-</button>
          <span>{{ drink.quantity }}</span>
          <button @click="increaseQuantity(drink)">+</button>
        </div>
        <button class="add-button" @click="addToCart(drink)">Ajouter</button>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Zen Burger', image: 'https://ecoceabkstorageprdnorth.blob.core.windows.net/custom-pages/2023/Zen/produit_1.png', quantity: 1, price: 9.95 },
        { id: 2, name: 'Cheese Burger', image: 'https://eatside.fr/wp-content/uploads/2022/04/cheeseburger.png', quantity: 1, price: 10.99 },
        { id: 3, name: 'BlackWhite Burger', image: 'https://bnwburger.com/uploads/restaurant-menu/1/44f6303f7028eac9fc34faf94ba36c07.png', quantity: 1, price: 2.95 }
      ],
      drinks: [
        { id: 5, name: 'Coca-Cola', image: 'https://www.laptitecuisine45.com/upload/modules/mosaic/produit/coke.png', quantity: 1, price: 2.95 },
        { id: 6, name: 'Ice Tea', image: 'https://chickenbest-reims.fr/wp-content/uploads/2022/12/Fineandza-Ice-Tea-peche.png', quantity: 1, price: 2.50 },
        { id: 7, name: 'kizilay ', image: 'https://www.kizilayicecek.com.tr/media/f4pm313e/rev-sademaden-alt-slider.png', quantity: 1, price: 2.75 },
      ]
    };
  },
  methods: {
    addToCart(product) {
      this.$emit('addToCart', {
        ...product,
        totalQuantity: product.quantity
      });
      product.quantity = 1;
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
    increaseQuantity(product) {
      product.quantity++;
    }
  }
}

</script>



<style scoped>
.top {
  padding-bottom: 2%;
  margin-top: 10%;
  margin-left: 20%;
  display: flex;
  font-size: 15px;
  font-family: 'Poppins', 'Arial', 'serif';
}

.product-list {
  margin-left: 16%;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  padding: 20px;
  max-width: 990px;
  display: flex;
  background-color: white;
}

.product-card {
  width: 220px;
  background-color: lightgrey;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center;
}

.product-price {
  font-size: 14px;
  color: #777;
  margin-bottom: 15px;
}

.quantity-control {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.quantity-control button {
  flex: 1;
  background-color: #F5F5F5;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.quantity-control span {
  flex: 1;
  text-align: center;
}

.add-button {
  width: 100%;
  background-color: #FF4C4C;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #E43E3E;
}
</style>
