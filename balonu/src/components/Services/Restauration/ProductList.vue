<template>
    <div>
        <div class="top">
            <h2><strong>Liste de nos burgers :</strong></h2>
        </div>
        <div v-if="selectedCategoryIdBurger === 'Burger'">
            <div class="product-list">
                <div v-for="produit in getFilteredProducts(3)" :key="produit.id_produit" class="product-card">
                    <img class="product-image" :src="produit.image_produit" :alt="produit.libelle_produit" />
                    <h3>{{ produit.libelle_produit }}</h3>
                    <span class="product-price">{{ produit.prix_produit }}€</span>
                    <span class="product-stock">Stock: {{ produit.stock_produit }}</span>
                    <div class="quantity-control">
                        <button @click="decreaseQuantity(produit)">-</button>
                        <span>{{ quantities[produit.id_produit]}}</span>
                        <button @click="increaseQuantity(produit)">+</button>
                    </div>
                    <button class="add-button" @click="addToCart(produit)">Ajouter</button>
                </div>
            </div>
        </div>

        <div class="top">
            <h2><strong>Liste de nos boissons :</strong></h2>
        </div>
        <div v-if="selectedCategoryIdBoisson === 'Boisson'">
            <div class="product-list">
                <div v-for="produit in getFilteredProducts(4)" :key="produit.id_produit" class="product-card">
                    <img class="product-image" :src="produit.image_produit" :alt="produit.libelle_produit" />
                    <h3>{{ produit.libelle_produit }}</h3>
                    <span class="product-price">{{ produit.prix_produit }}€</span>
                    <span class="product-stock">Stock: {{ produit.stock_produit }}</span>
                    <div class="quantity-control">
                        <button @click="decreaseQuantity(produit)">-</button>
                        <span>{{ quantities[produit.id_produit] }}</span>
                        <button @click="increaseQuantity(produit)">+</button>
                    </div>
                    <button class="add-button" @click="addToCart(produit)">Ajouter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {

            selectedCategoryIdBurger: "Burger",
            selectedCategoryIdBoisson: "Boisson",
            categories: [],
            quantities: {},
        };
    },
    computed: {
        ...mapGetters("produits", ["getProduits"]),
        ...mapState("produits", ["produits"]),
    },
    methods: {

        async fetchProduitsByStand(id_stand) {
            try {
                // Utilisez l'ID du stand pour récupérer les produits
                const response = await axiosMarche.get(`/relations/produitsByStand/${id_stand}`);
                this.someData = response.data;  // Mettez à jour someData plutôt que produits
                console.log("Produits par stand:", this.someData);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits par stand:", error.message);
            }
        },
        getFilteredProducts(category) {
            return this.produits.filter((produit) => produit.id_categorie === category);
        },

        ...mapActions("produits", ["fetchProduits", "addProduit", "updateProduit", "deleteProduit"]),
    },
    async mounted() {
        const id_stand = this.$route.params.id;
        await this.fetchProduitsByStand(id_stand);

        this.produits.forEach((produit) => {
            this.$set(this.quantities, produit.id_produit, 1);
        });
    },
};
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


.ajout-bouton {
    background-color: #E30A17; /* Gris bleu doux */
    color: #ffffff; /* Couleur du texte plus foncée pour le contraste */

    border: 1px solid #d3d3d3; /* Bordure plus subtile */
    padding: 4px 28px;
    font-family: 'Poppins', serif;
    font-size: 18px; /* Taille de police légèrement plus petite */
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 280px; /* Légèrement plus étroit */
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.ajout-bouton:hover {
    transform: scale(0.95);
    box-shadow: 0px 2px 3px rgba(34, 34, 34, 0.15); /* Ombre plus légère */
}
</style>
