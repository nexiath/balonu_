<template>
    <div class="quoicoubeeeh">
        <h2>Mes Montgolfières</h2>
        <router-link to="/ajoutmontgolfiere">
            <button class="ajout-bouton" v-if="isAuthenticated && (userIdRole === 2)">
                Ajouter une Montgolfiere
            </button>
        </router-link>
        <div class="montgolfieres-container">
            <div v-for="montgolfiere in montgolfieres" :key="montgolfiere.id_montgolfiere" class="montgolfiere-card">
                <div v-if="editingMontgolfiereId === montgolfiere.id_montgolfiere" class="edit-form">
                    <div class="form-group">
                        <label for="libelleMontgolfiere">Libellé de la montgolfière:</label>
                        <input id="libelleMontgolfiere" type="text" v-model="editForm.libelle_montgolfiere" placeholder="Libellé" required>
                    </div>
                    <div class="form-group">
                        <label for="nombrePlace">Nombre de places:</label>
                        <input id="nombrePlace" type="number" v-model="editForm.nombre_place" placeholder="Nombre de places" required>
                    </div>
                    <div class="form-group">
                        <label for="photo">Photo URL:</label>
                        <input id="photo" type="text" v-model="editForm.photo_montgolfiere" placeholder="URL de la photo">
                    </div>
                    <div class="form-group">
                        <label for="estActive">Actif:</label>
                        <input id="estActive" type="checkbox" v-model="editForm.montgolfiere_est_active">
                    </div>
                    <div class="form-group">
                        <label for="couleur">Couleur:</label>
                        <select id="couleur" v-model="editForm.id_couleur">
                            <option v-for="couleur in couleurs" :key="couleur.id_couleur" :value="couleur.id_couleur">
                                {{ couleur.libelle_couleur }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="idParcours">Parcours:</label>
                        <select id="idParcours" v-model="editForm.id_parcours">
                            <option v-for="parcours in parcours" :key="parcours.id_parcours" :value="parcours.id_parcours">
                                {{ parcours.libelle_parcours }} - {{ parcours.distance_parcours }}km - {{ parcours.duree_parcours }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="prixVol">Prix du Vol:</label>
                        <input id="prixVol" type="number" v-model="editForm.prix_vol" placeholder="Prix du Vol" required>
                    </div>
                    <div class="form-group">
                        <label for="libelleVol">Libellé du Vol:</label>
                        <input id="libelleVol" type="text" v-model="editForm.libelle_vol" placeholder="Libellé du Vol" required>
                    </div>
                    <div class="form-group">
                        <label for="avisVol">Avis sur le Vol:</label>
                        <VueEditor v-model="editForm.avis_vol"></VueEditor>
                    </div>
                    <div class="form-group">
                        <label for="dateDebut">Date de début:</label>
                        <input id="dateDebut" type="datetime-local" v-model="editForm.date_debut" required>
                    </div>
                    <div class="form-group">
                        <label for="dateFin">Date de fin:</label>
                        <input id="dateFin" type="datetime-local" v-model="editForm.date_fin" required>
                    </div>
                    <button @click="saveMontgolfiere(montgolfiere.id_montgolfiere)">Sauvegarder</button>
                    <button @click="cancelEditing">Annuler</button>
                </div>
                <div v-else>
                    <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière" class="montgolfiere-image">
                    <div class="info-container">
                    <h3>{{ montgolfiere.libelle_montgolfiere }}</h3>
                    <p>Nombre de places: {{ montgolfiere.nombre_place }}</p>
                    <p>Statut: {{ montgolfiere.montgolfiere_est_active ? 'Active' : 'Inactive' }}</p>
                    <p>Couleur: {{ montgolfiere.libelle_couleur }}</p>
                    <p>Prix du Vol: {{ montgolfiere.prix_vol }} €</p>
                    <p>Libellé du Vol: {{ montgolfiere.libelle_vol }}</p>
                    <p>Description du Vol: <span v-html="montgolfiere.avis_vol"></span></p>
                    <p>Parcours: {{ montgolfiere.libelle_parcours }}</p>
                    <p>Distance du Parcours: {{ montgolfiere.distance_parcours }} km</p>
                    <p>Durée du Parcours: {{ montgolfiere.duree_parcours }}</p>
                    <p>Date de Début: {{ new Date(montgolfiere.date_debut).toLocaleString() }}</p>
                    <p>Date de Fin: {{ new Date(montgolfiere.date_fin).toLocaleString() }}</p>
                    </div>
                    <div class="button-container">
                        <button @click="startEditing(montgolfiere.id_montgolfiere)">Modifier</button>
                        <button @click="deleteMontgolfiere(montgolfiere.id_montgolfiere)">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/services/axios.service';
import { mapGetters } from 'vuex';
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    data() {
        return {
            montgolfieres: [],
            isLoading: false,
            editingMontgolfiereId: null,
            editForm: {
                libelle_montgolfiere: '',
                nombre_place: 0,
                photo_montgolfiere: '',
                montgolfiere_est_active: false,
                id_couleur: null,
                id_parcours: null,
                prix_vol: 0,
                libelle_vol: '',
                avis_vol: '',
                date_debut: '',
                date_fin: ''
            },
            couleurs: [],
            parcours: []
        };
    },
    created() {
        this.fetchMontgolfieres();
        this.fetchCouleurs();
        this.fetchParcours();
    },
    computed: {
        ...mapGetters('auth', ['userID','isAuthenticated', 'userDetails', 'userIdRole']),

    },
    methods: {
        async fetchMontgolfieres() {
            this.isLoading = true;
            try {
                const userId = this.userID;
                const response = await axios.get(`http://localhost:3030/montgolfieres/utilisateur/${userId}`);
                this.montgolfieres = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des montgolfières:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchCouleurs() {
            try {
                const response = await axios.get('/couleurs');
                this.couleurs = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des couleurs:', error);
            }
        },
        async fetchParcours() {
            try {
                const response = await axios.get('/parcours');
                this.parcours = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des parcours:', error);
            }
        },
        startEditing(id) {
            this.editingMontgolfiereId = id;
            const montgolfiere = this.montgolfieres.find(m => m.id_montgolfiere === id);
            if (montgolfiere) {
                this.editForm = {
                    ...montgolfiere,
                    date_debut: this.convertToDateTimeLocal(montgolfiere.date_debut),
                    date_fin: this.convertToDateTimeLocal(montgolfiere.date_fin)
                };
            }
        },
        convertToDateTimeLocal(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const offset = date.getTimezoneOffset();
            const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
            return adjustedDate.toISOString().slice(0, 16);
        },
        async saveMontgolfiere(id) {
            try {
                this.isLoading = true;
                const dataToSend = {
                    nombrePlace: parseInt(this.editForm.nombre_place),
                    libelleMontgolfiere: this.editForm.libelle_montgolfiere,
                    photo: this.editForm.photo_montgolfiere,
                    estActive: this.editForm.montgolfiere_est_active === true, // Assurez-vous que c'est un booléen
                    idCouleur: parseInt(this.editForm.id_couleur),
                    prixVol: parseFloat(this.editForm.prix_vol),
                    libelleVol: this.editForm.libelle_vol,
                    avisVol: this.editForm.avis_vol,
                    idParcours: parseInt(this.editForm.id_parcours),
                    dateDebut: this.editForm.date_debut, // Formattez si nécessaire
                    dateFin: this.editForm.date_fin, // Formattez si nécessaire
                };

                await axios.put(`http://localhost:3030/montgolfieres/${id}`, dataToSend);
                this.cancelEditing();
                this.fetchMontgolfieres();
                alert("Montgolfière mise à jour avec succès");
            } catch (error) {
                console.error('Erreur lors de la mise à jour:', error);
                alert("Erreur lors de la mise à jour: " + (error.response ? error.response.data.message : error.message));
            } finally {
                this.isLoading = false;
            }
        },
        async deleteMontgolfiere(id) {
            try {
                await axios.delete(`http://localhost:3030/montgolfieres/${id}`);
                this.fetchMontgolfieres();
                alert("Montgolfière supprimée avec succès");
            } catch (error) {
                console.error('Erreur lors de la suppression de la montgolfière:', error);
                alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
            }
        },
        cancelEditing() {
            this.editingMontgolfiereId = null;
            this.resetEditForm();
        },
        resetEditForm() {
            this.editForm = {
                libelle_montgolfiere: '',
                nombre_place: 0,
                photo_montgolfiere: '',
                montgolfiere_est_active: false,
                id_couleur: null,
                id_parcours: null,
                prix_vol: 0,
                libelle_vol: '',
                avis_vol: '',
                date_debut: '',
                date_fin: ''
            };
        }
    }
};
</script>





<style scoped>

.info-container {
    text-align: center;
}

.ajout-bouton {
    background-color: #E30A17;
    color: #ffffff;
    border: 1px solid #d3d3d3;
    padding: 4px 28px;
    font-family: 'Poppins', serif;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 280px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.ajout-bouton:hover {
    transform: scale(0.95);
    box-shadow: 0px 2px 3px rgba(34, 34, 34, 0.15);
    /* Ombre plus légère */
}
.button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.quoicoubeeeh {
    padding-top: 10%;
    background-color: #fcfcfc;
}

.montgolfieres-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.montgolfiere-card {
    max-width: 380px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.montgolfiere-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}


.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    font-weight: bold;
    color: #464646;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
}

button {
    background-color: #E30A17;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    width: 100%;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #bf0a11;
}


.card-content {
    padding: 15px;
}

.names, .prices, .location, .duration-box {
    font-family: 'Poppins', sans-serif;
    color: #464646;
}

.names {
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
}

.prices {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.location {
    font-size: 16px;
    margin-bottom: 10px;
}

.duration-box {
    padding: 10px;
    border: 2.5px solid red;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
}

.explore {
    color: #E30A17;
    text-decoration: none;
    font-size: 16px;
    margin-top: 10px;
}

.card-content.inactive {
    background-color: #ccc;
    pointer-events: none;
}

.inactive-text {
    color: red;
    text-align: center;
    font-weight: bold;
}
</style>
