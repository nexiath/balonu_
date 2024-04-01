<template>
    <div class="modifier-stand">
        <h2>Modifier le stand</h2>
        <form @submit.prevent="updateStand">
            <div>
                <label for="id">id stand:</label>
                <input type="number" v-model="id_stand" id="id" />
            </div>
            <div>
                <label for="id_categorie">id catégorie stand:</label>
                <input type="number" v-model="id_categorie_stand" id="id_categorie" />
            </div>
            <div>
                <label for="libelle">Libellé stand:</label>
                <input type="text" v-model="libelle" id="libelle" required />
            </div>
            <div>
                <label for="description">Description stand:</label>
                <input type="text" v-model="description" id="description" required />
            </div>
            <div>
                <label for="image">Image stand:</label>
                <input type="text" v-model="image" id="image" required />
            </div>
            <div>
                <label for="emplacement">Emplacement:</label>
                <select v-model="selectedEmplacement" id="emplacement" required>
                    <!-- Options pour les emplacements, ajustez selon vos besoins -->
                    <option v-for="emplacement in emplacementsWithoutStand" :key="emplacement.id_emplacement" :value="emplacement.id_emplacement">
                        {{ emplacement.libelle_emplacement }} {{ emplacement.id_emplacement }}
                    </option>
                </select>
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            id_stand: null,
            libelle: "",
            description: "",
            image: "",
            selectedEmplacement: null,
            id_categorie_stand: null,
        };
    },
    computed: {
        ...mapGetters('standsEmplacements', ['getSelectedStand']),
        ...mapGetters('emplacements', ['getEmplacementsWithoutStand']),
        ...mapState('emplacements', ["emplacementsWithoutStand"])
    },
    methods: {
        ...mapActions('standsEmplacements', ['fetchStandById', 'updateStand']),
        ...mapActions('emplacements', ["fetchEmplacementsWithoutStand"]),
        async fetchStandData() {
            const standId = this.$route.params.id_stand;

            // Appeler l'action Vuex pour récupérer les données du stand
            await this.fetchStandById(standId);

            // Mettre à jour les données du composant avec les valeurs récupérées du stand
            const selectedStand = this.getSelectedStand;
            console.log("Voici la réponse :" + selectedStand.id_stand);
            console.log("Voici la réponse :" + selectedStand.id_categorie_stand);
            console.log("Voici la réponse :" + selectedStand.description_stand);
            console.log("Voici la réponse :" + selectedStand.image_stand);
            console.log("Voici la réponse :" + selectedStand.id_emplacement);
            this.id_stand = selectedStand.id_stand;
            this.id_categorie_stand = selectedStand.id_categorie_stand;
            this.libelle = selectedStand.libelle_stand;
            this.description = selectedStand.description_stand;
            this.image = selectedStand.image_stand;
            this.selectedEmplacement = selectedStand.id_emplacement;
        },
        async updateStand() {
            try {
                const standModifie = {
                    id_stand: this.id_stand,
                    libelle_stand: this.libelle,
                    description_stand: this.description,
                    image_stand: this.image,
                    id_emplacement: this.selectedEmplacement,
                    id_categorie_stand: this.id_categorie_stand,
                };

                // Appeler la mutation Vuex pour mettre à jour le stand
                await this.$store.dispatch('standsEmplacements/updateStand', standModifie);
                this.$router.push('/orga');
            } catch (error) {
                console.error(error);
                // Gérer les erreurs si nécessaire
            }
        }
    },
    mounted() {
        this.fetchStandData();
        this.fetchEmplacementsWithoutStand(); // Appeler la méthode pour récupérer les emplacements sans stand
    },
};
</script>

<style scoped>
.modifier-stand {
    max-width: 400px;
    margin: 20px auto;
    margin-top: 20em;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
}

input, select {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
