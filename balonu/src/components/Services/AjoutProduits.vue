<template>
    <div className="flop">
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="nouveauProduit.libelle_produit" placeholder="Libellé">
            <input type="number" v-model="nouveauProduit.stock_produit" placeholder="Nombre de stocks">
            <input type="text" v-model="nouveauProduit.prix_produit" placeholder="Prix du produit">
            <input type="text" v-model="nouveauProduit.description_produit" placeholder="Description du produit">
            <input type="text" v-model="nouveauProduit.image_produit" placeholder="Lien de la photo">
            <select v-model="selectedCategoryId">
                <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">
                    {{ categorie.libelle_categorie }}
                </option>
            </select>
            <button type="submit">Sauvegarder</button>

        </form>

        <h2>Aperçu du produit</h2>
        <div className="card">
            <img :src="nouveauProduit.image_produit" alt="Photo de la montgolfière">
            <div className="card-content">
                <div>{{ nouveauProduit.libelle_produit }}</div>
                <div>{{ nouveauProduit.prix_produit }} €</div>
                <div>{{ nouveauProduit.stock_produit }} stocks</div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {
            nouveauProduit: {
                libelle_produit: "",
                stock_produit: 0,
                prix_produit: "",
                description_produit: "",
                quantite_produit: 1,
                image_produit: "",
                id_categorie: null,
            },
            modeEdition: false,
            selectedCategoryIdBurger: "Burger",
            selectedCategoryIdBoisson: "Boisson",
            categories: [],
            quantities: {},
        };
    },
    computed: {
        ...mapState('auth', ['userID']),
        ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
        ...mapGetters("catego", ["getCategories"]),

    },
    methods: {
        getFilteredProducts(category) {
            return this.produits.filter((produit) => produit.id_categorie === category);
        },
        async fetchProduits() {
            try {
                const response = await axiosMarche.get('/produits');
                this.produits = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        },
        async handleSubmit() {

            if (!this.validateForm()) {
                console.error('Validation du formulaire échouée');
                return;
            }

            try {
                const url = this.nouveauProduit.id_produit
                    ? `/produits/${this.nouveauProduit.id_produit}`
                    : '/produits';
                const method = this.nouveauProduit.id_produit ? 'put' : 'post';

                await axiosMarche[method](url, this.nouveauProduit);
                this.fetchProduits();
                this.$router.push('/restauration');
            } catch (error) {
                console.error('Erreur lors de la soumission du formulaire:', error);
            }
            this.resetForm();
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
        resetForm() {
            this.montgolfiereForm = {
                id_produit: null,
                libelle_produit: '',
                stock_produit: null,
                prix_produit: '',
                description_produit: '',
                quantite_produit: null,
                image_produit: '',
                id_categorie: null,

            };
        },
        editMontgolfiere(montgolfiere) {
            this.montgolfiereForm = {...montgolfiere};
        },
        async deleteMontgolfiere(id_montgolfiere) {
            try {
                await axiosMarche.delete(`/montgolfieres/${id_montgolfiere}`);
                this.fetchMontgolfieres(); // Actualiser la liste après suppression
            } catch (error) {
                console.error('Erreur lors de la suppression de la montgolfière:', error);
            }
        },
        ...mapActions("produits", ["fetchProduits", "addProduit", "updateProduit", "deleteProduit"]),

        ...mapActions("catego", ["fetchCategoriesAction"]),
        async fetchCategories() {
            try {
                const response = await this.$store.dispatch("catego/fetchCategoriesAction");
                this.categories = response.data; // Mettez à jour le tableau categories
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories :", error);
            }
        },
    },
    mounted() {
        this.fetchMontgolfieres();
        this.fetchProduits();
        this.fetchCategories();
    }
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
