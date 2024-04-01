<template>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <!-- Champs pour la montgolfière -->
            <div class="form-group">
                <label for="libelleMontgolfiere">Libellé de la montgolfière:</label>
                <input id="libelleMontgolfiere" type="text" v-model="montgolfiereForm.libelle" placeholder="Libellé" required>
            </div>

            <div class="form-group">
                <label for="nombrePlace">Nombre de places:</label>
                <input id="nombrePlace" type="number" v-model="montgolfiereForm.nombrePlace" placeholder="Nombre de places" required>
            </div>

            <div class="form-group">
                <label for="photo">Photo URL:</label>
                <input id="photo" type="text" v-model="montgolfiereForm.photo" placeholder="URL de la photo">
            </div>

            <div class="form-group">
                <label for="estActive">Actif:</label>
                <input id="estActive" type="checkbox" v-model="montgolfiereForm.estActive">
            </div>

            <div class="form-group">
                <label for="couleur">Couleur:</label>
                <select id="couleur" v-model="montgolfiereForm.idCouleur">
                    <option v-for="couleur in couleurs" :key="couleur.id_couleur" :value="couleur.id_couleur">
                        {{ couleur.libelle_couleur }}
                    </option>
                </select>
            </div>

            <!-- Champs pour le vol -->
            <div class="form-group">
                <label for="libelleVol">Libellé du Vol:</label>
                <input id="libelleVol" type="text" v-model="montgolfiereForm.libelleVol" placeholder="Libellé du Vol" required>
            </div>

            <div class="form-group">
                <label for="prixVol">Prix du Vol:</label>
                <input id="prixVol" type="number" v-model="montgolfiereForm.prixVol" placeholder="Prix du Vol" required>
            </div>

            <div class="form-group">
                <label for="avisVol">Avis sur le Vol:</label>
                <vue-editor id="avisVol" v-model="montgolfiereForm.avisVol"></vue-editor>
            </div>

            <label for="idParcours">Parcours:</label>
            <select id="idParcours" v-model="montgolfiereForm.idParcours">
                <option v-for="parcours in parcours" :key="parcours.id_parcours" :value="parcours.id_parcours">
                    {{ parcours.libelle_parcours }} - {{ parcours.distance_parcours }}km - {{ parcours.duree_parcours }}
                </option>
            </select>

            <!-- Champs pour le planning -->
            <div class="form-group">
                <label for="dateDebut">Date de début:</label>
                <input id="dateDebut" type="datetime-local" v-model="montgolfiereForm.dateDebut" required>
            </div>

            <div class="form-group">
                <label for="dateFin">Date de fin:</label>
                <input id="dateFin" type="datetime-local" v-model="montgolfiereForm.dateFin" required>
            </div>

            <button type="submit" :disabled="isSubmitting">Créer Montgolfière</button>
        </form>
        <!-- Aperçu de la montgolfière -->
        <div class="card">
            <img :src="montgolfiereForm.photo_montgolfiere" alt="Photo de la montgolfière">
            <div class="card-content">
                <h3>{{ montgolfiereForm.libelle_montgolfiere }}</h3>
                <p>{{ montgolfiereForm.nombre_place }} places</p>
                <p>Statut : {{ montgolfiereForm.montgolfiere_est_active ? 'Actif' : 'Inactif' }}</p>
                <p>Libellé du Vol: {{ montgolfiereForm.libelle_vol }}</p>
                <p>Prix du Vol: {{ montgolfiereForm.prix_vol }} €</p>
                <p>Description du Vol:</p>
                <div class="vol-description" v-html="montgolfiereForm.avis_vol"></div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from '../../../services/axios.service';
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    data() {
        return {
            montgolfiereForm: {
                nombrePlace: '',
                libelle: '',
                photo: '',
                estActive: false,
                idCouleur: '',
                prixVol: '',
                libelleVol: '',
                avisVol: '',
                idParcours: '', // Ici, cela devrait être l'ID du parcours sélectionné
                dateDebut: '',
                dateFin: ''
            },
            couleurs: [],
            parcours: [], // Ajoutez cette ligne pour initialiser le tableau des parcours
            isSubmitting: false
        };
    },
    mounted() {
        this.fetchCouleurs();
        this.fetchParcours();
    },
    methods: {
        async fetchCouleurs() {
            try {
                const response = await axios.get('http://localhost:3030/couleurs');
                this.couleurs = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des couleurs:', error);
            }
        },
        async fetchParcours() {
            try {
                const response = await axios.get('http://localhost:3030/parcours');
                this.parcours = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des parcours:', error);
            }
        },
        async handleSubmit() {
            if (this.isSubmitting) {
                return; // Empêcher la soumission multiple si déjà en cours
            }
            this.isSubmitting = true;
            try {
                const response = await axios.post('http://localhost:3030/montgolfieres', this.montgolfiereForm);
                console.log(response.data); // Log pour vérifier la réponse du serveur
                alert('Montgolfière créée avec succès!');
                this.resetForm();
            } catch (error) {
                console.error('Erreur lors de la création:', error);
                alert('Erreur lors de la création de la montgolfière.');
            } finally {
                this.isSubmitting = false;
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.montgolfiereForm.photo = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        resetForm() {
            this.montgolfiereForm = {
                libelle: '',
                nombrePlace: '',
                photo: '',
                estActive: false,
                idCouleur: '',
                libelleVol: '',
                prixVol: '',
                avisVol: '',
                dateDebut: '',
                idParcours: '',
                dateFin: ''
            };
        }
    }
};
</script>




<style scoped>
.container {
    padding-top: 5%;
}

.flop {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
    align-items: flex-start;
}

form {
    flex: 1; /* Prend l'espace disponible */
    max-width: 500px; /* Largeur maximale pour le formulaire */
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
}
input[type="file"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
}

.vol-description {
    /* Limitez la taille maximale des images */
    img {
        max-width: 100%;
        height: auto;
    }
}

input, select, .vue-editor {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1em;
}

input[type="checkbox"] {
    margin-top: 0;
    transform: scale(1.2); /* Légèrement agrandie pour une meilleure accessibilité */
}

.vue-editor {
    min-height: 150px; /* Assure une hauteur minimale pour l'éditeur */
}

button {
    background-color: #E30A17;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
    background-color: #bf0a0d;
}

.card {
    position: fixed; /* Fixe la carte à une position dans la fenêtre */
    right: 5%; /* Position à droite de l'écran */
    top: 30%; /* Position à partir du haut de l'écran */
    width: 700px;
    max-width: 300px; /* Largeur maximale pour la carte */
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}


.card img {
    max-width: 100%;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.card-content {
    margin-top: 15px;
    font-size: 0.95em;
}

.drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .flop {
        flex-direction: column;
        align-items: center;
    }

    .card {
        order: -1; /* Afficher en premier sur petits écrans */
        width: 80%;
        margin-bottom: 20px;
    }

    form {
        width: 80%;
    }
}

@media (max-width: 768px) {
    .flop {
        flex-direction: column;
    }

    .card {
        position: static; /* Rétablir le positionnement normal sur les petits écrans */
        order: -1; /* Aperçu en haut */
        width: 100%;
        max-width: none;
    }

    form {
        width: 100%;
        max-width: none;
    }
}
</style>

  