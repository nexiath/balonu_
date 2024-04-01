<template>
    <div class="all">
        <div v-for="categoryId in [3, 4, 1, 2]" :key="categoryId">
            <div v-if="getFilteredProducts(categoryId).length > 0">
                <div class="top">
                    <h2><strong>{{ getCategoryTitle(categoryId) }}</strong></h2>
                </div>
                <div class="product-list">
                    <div v-for="produit in getFilteredProducts(categoryId)" :key="produit.id_produit" class="product-card">
                        <img class="product-image" :src="produit.image_produit" :alt="produit.libelle_produit" />
                        <h3 v-if="!produit.isEditing">{{ produit.libelle_produit }}</h3>
                        <input v-else v-model="produit.libelle_produit" />
                        <span class="product-price">
                            <span v-if="!produit.isEditing">{{ produit.prix_produit }}€</span>
                            <input v-else v-model.number="produit.prix_produit" />
                        </span>
                        <span class="product-stock">
                            <span v-if="!produit.isEditing">Stock: {{ produit.stock_produit }}</span>
                            <input v-else v-model.number="produit.stock_produit" />
                        </span>

                        <button v-if="userIdRole === 1 && isUserAffecteAuStand" @click="toggleEdition(produit)" class="add-button">
                            {{ produit.isEditing ? 'Enregistrer' : 'Modifier' }}
                        </button>

                        <button v-if="userIdRole === 1 && isUserAffecteAuStand" @click="supprimerProduit(produit)" class="add-button">Supprimer</button>
                        <div class="quantity-control">
                            <button @click="decrementQuantity(produit)" class="quantity-button">-</button>
                            <span>{{ produit.quantite_produit }}</span>
                            <button @click="incrementQuantity(produit)" class="quantity-button">+</button>
                        </div>
                        <button @click="addToCart(produit)" class="add-button">Ajouter</button>
                    </div>
                </div>
            </div>
        </div>
        <button v-if="userIdRole === 1 && isUserAffecteAuStand" class="ajout-bouton" @click="redirigerAjoutProduit">
            Ajouter un produit
        </button>
    </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {
            selectedCategoryIdBurger: "Burger",
            selectedCategoryIdBoisson: "Boisson",
            selectedCategoryIdVetement: "Vêtement",
            selectedCategoryIdAccessoire: "Accessoire",
            categories: [],
            isUserAffecteAuStand: false,
        };
    },
    computed: {
        ...mapState("produits", ["produits"]),
        ...mapGetters('auth', ['userIdRole']),
    },
    created() {
        this.updateIsUserAffecteAuStand();
    },
    methods: {
        async supprimerProduit(produit) {
            const id_stand = this.$route.params.id;
            const produitIdResponse = await axiosMarche.get(`relations/affectationsStand/${id_stand}/${produit.id_produit}`);
            const produitId = produitIdResponse.data.produitId;
            await axiosMarche.delete(`relations/affectationsStand/${id_stand}/${produit.id_produit}`);
            const index = this.produits.findIndex(p => p.id_produit === produitId);
            if (index !== -1) {
                this.$store.commit('produits/supprimerProduit', index);
            }
            await axiosMarche.delete(`/produits/${produitId}`);
        },

        toggleEdition(produit) {
            if (!produit.isEditing) {
                this.$set(produit, 'isEditing', true);
            } else {

                axiosMarche.put(`/produits/${produit.id_produit}`, produit)
                    .then(response => {
                        console.log("Produit mis à jour avec succès:", response.data);
                        this.$store.commit('produits/updateProduit', response.data);
                        produit.isEditing = false;
                    })
                    .catch(error => {
                        console.error('Erreur lors de la mise à jour du produit', error);
                    });
            }
        },
        async redirigerAjoutProduit() {
            const id_stand = this.$route.params.id;
            try {
                this.$router.push(`/ajoutproduits/${id_stand}`);
            } catch (error) {
                console.error('Erreur lors de la récupération des données d\'affectation du stand', error);
            }
        },
        // ---------------------------------------
        // pour le panier
        incrementQuantity(product) {
            if (!product.quantite_produit) {
                this.$set(product, "quantite_produit", 1);
            } else if (product.quantite_produit < product.stock_produit) {
                product.quantite_produit++;
            }
        },
        decrementQuantity(product) {
            if (product.quantite_produit && product.quantite_produit > 1) {
                product.quantite_produit--;
            }
        },
        addToCart(product) {
            this.$emit('add-to-cart', product);
        },
        // --------------------------------------
        // pour les produits et les prestataire
        getCategoryTitle(categoryId) {
            switch (categoryId) {
                case 3:
                    return "Liste de nos burgers :";
                case 4:
                    return "Liste de nos boissons :";
                case 1:
                    return "Liste de nos vêtements :";
                case 2:
                    return "Liste de nos accessoires :";
                default:
                    return "";
            }
        },
        async updateIsUserAffecteAuStand() {
            const id_stand = this.$route.params.id;
            const userId = this.$store.getters['auth/userDetails'];

            if (userId) {
                axiosMarche.get(`/relations/affectationsStand/${id_stand}`)
                    .then(response => {
                        const affectationStand = response.data;
                        this.isUserAffecteAuStand = !!(affectationStand && affectationStand.id_utilisateur === userId.id_utilisateur);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des données d\'affectation du stand', error);
                    });
            }
        },
        getFilteredProducts(category) {
            return this.produits.filter((produit) => produit.id_categorie === category);
        },
    },
};
</script>



<style scoped>

.all {
    margin-top: 10%;
}
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
    margin-top: 100px;
}

.ajout-bouton:hover {
    transform: scale(0.95);
    box-shadow: 0px 2px 3px rgba(34, 34, 34, 0.15); /* Ombre plus légère */
}
</style>
