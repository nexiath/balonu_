<template>
    <div id="root">
        <div id="app">
            <ProductList @add-to-cart="addToCart"/>
            <ShoppingCart :items="cartItems" @remove-item="removeItemFromCart" />

        </div>
    </div>
</template>

<script>

import ProductList from '@/components/Services/ProductList.vue';
import ShoppingCart from "@/components/Services/ShoppingCart.vue";
import Cookies from 'js-cookie';
import axiosMarche from "@/services/axios.service";
export default {
    components: {
        ShoppingCart,
        ProductList,
    },
    data() {
        return {
            cartItems: [],
        };
    },
    created() {
        const storedCartItems = Cookies.get('cartItems');
        console.log('Stored Cart Items:', storedCartItems);

        this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        console.log('Cart Items:', this.cartItems);
    },
    mounted() {
        this.$root.$on('clear-cart', this.clearCart);
    },
    methods: {
        addToCart(product) {
            const quantityToAdd = product.quantite_produit;

            if (product.stock_produit >= quantityToAdd) {
                this.updateProductStock(product.id_produit, product.stock_produit - quantityToAdd);
                this.cartItems.push({ ...product, quantite_produit: quantityToAdd });
                product.stock_produit -= quantityToAdd;
                this.calculateTotalPrice();
                this.saveCartToCookies(this.cartItems);
            } else {
                console.error('Stock insuffisant pour le produit:', product.libelle_produit);
            }
        },
        async updateProductStock(productId, newStock) {
            try {
                await axiosMarche.put(`/produits/${productId}/updatestock`, {
                    stock_produit: newStock,
                });
                console.log(`Stock du produit avec l'ID ${productId} mis à jour avec succès.`);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du stock du produit', error);
            }
        },
        calculateTotalPrice() {
            const total = this.cartItems.reduce((acc, item) => {
                if (item && item.price) {
                    return acc + (item.price * item.quantity);
                }
                return acc;
            }, 0);

            this.totalPrice = total.toFixed(2);
        },
        saveCartToCookies(cartItems) {
            Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
        },
        removeItemFromCart(item) {
            const index = this.cartItems.findIndex(cartItem => cartItem.id_produit === item.id_produit);
            const quantityToAdd = item.quantite_produit;

            if (index !== -1) {
                const removedItem = this.cartItems.splice(index, 1)[0];
                console.log(`Produit retiré du panier: ${removedItem.libelle_produit}, quantité retirée: ${quantityToAdd}`);
                this.updateProductStock(removedItem.id_produit, removedItem.stock_produit + quantityToAdd);
                this.calculateTotalPrice();
                this.saveCartToCookies(this.cartItems);
            }
        },
        clearCart() {
            this.cartItems = [];
            this.saveCartToCookies(this.cartItems);
        },
    },
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


</style>
