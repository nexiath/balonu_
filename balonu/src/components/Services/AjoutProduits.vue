<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="nouveauProduit.libelle_produit" placeholder="Libellé">
            <input type="number" v-model="nouveauProduit.stock_produit" placeholder="Nombre de stocks">
            <input type="number" v-model="nouveauProduit.prix_produit" placeholder="Prix du produit">
            <input type="text" v-model="nouveauProduit.description_produit" placeholder="Description du produit">
            <input type="text" v-model="nouveauProduit.image_produit" placeholder="Lien de la photo">
            <select v-model="nouveauProduit.id_categorie">
                <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">
                    {{ categorie.libelle_categorie }}
                </option>
            </select>
            <button type="submit">Sauvegarder</button>
        </form>

        <h2>Aperçu du Produit</h2>
        <div class="card">
            <img :src="nouveauProduit.image_produit" alt="Photo du produit">
            <div class="card-content">
                <div>{{ nouveauProduit.libelle_produit }}</div>
                <div>{{ nouveauProduit.description_produit }} -> description</div>
                <div>{{ nouveauProduit.stock_produit }} -> stock </div>
                <div>{{ nouveauProduit.prix_produit }} -> prix</div>
                <div>{{ nouveauProduit.id_categorie }} : ID de la catégorie du produit </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {
            nouveauProduit: {
                libelle_produit: '',
                stock_produit: 0,
                prix_produit: 0,
                description_produit: '',
                quantite_produit: 1,
                image_produit: '',
                id_categorie: null,
            },
            produits: [],
            categories: [],
        };
    },
    computed: {
        ...mapState('auth', ['userID']),
        ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
        ...mapGetters('catego', ['getCategories']),
    },
    methods: {
        async fetchProduits() {
            try {
                const response = await axiosMarche.get('/produits');
                this.produits = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        },
        async createProduit(productData) {
            try {
                const response = await axiosMarche.post('/produits', productData);
                return response.data; // Retournez la réponse de la requête POST
            } catch (error) {
                console.error('Erreur lors de la création du produit:', error);
                throw error;
            }
        },
        async addProduitToStand(idStand, idProduit) {
            if (idStand && idProduit) {
                try {
                    const venteData = {
                        id_stand: idStand,
                        id_produit: idProduit,
                    };

                    await axiosMarche.post('/relations/ventes', venteData);
                    console.log('Produit ajouté au stand avec succès.');
                } catch (error) {
                    console.error('Erreur lors de l\'ajout du produit au stand:', error);
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    throw error;
                }
            } else {
                console.error('Les identifiants sont undefined.');
            }
        },
        async handleSubmit() {

            if (this.validateForm()) {
                try {
                    const nouveauProduitId = await this.createProduit(this.nouveauProduit);

                    console.log('ID du stand après la création du produit:', this.$route.params.id_stand);
                    console.log('ID du nouveau produit créé:', nouveauProduitId);

                    await this.addProduitToStand(this.$route.params.id_stand, nouveauProduitId);
                    await this.fetchProduits();
                    this.$router.push('/stands');
                } catch (error) {
                    console.error('Erreur lors du traitement du formulaire:', error);
                }
            } else {
                console.error('Formulaire invalide. Veuillez remplir tous les champs.');
            }
        },

        validateForm() {
            return (
                this.nouveauProduit.libelle_produit &&
                this.nouveauProduit.stock_produit &&
                this.nouveauProduit.prix_produit &&
                this.nouveauProduit.description_produit &&
                this.nouveauProduit.quantite_produit &&
                this.nouveauProduit.image_produit &&
                this.nouveauProduit.id_categorie
            );
        },
        async fetchCategories() {
            try {
                const response = await axiosMarche.get('/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        },
    },
    mounted() {
        this.standId = this.$route.params.id_stand;
        this.fetchProduits();
        this.fetchCategories();

    },
};
</script>


<style scoped>

* {
    padding-top: 5%
}

.card {
    max-width: 380px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin: 20px auto;
    overflow: hidden;
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.card-content {
    padding: 10px;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
    gap: 10px;
}

input[type="text"],
input[type="number"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

input[type="checkbox"] {
    align-self: center;
}

button {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #E30A17;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #bf0a0d;
}

h2 {
    text-align: center;
    margin-top: 30px;
}
</style>
