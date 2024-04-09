<template>
    <div class="all">
        <div class="container">
            <div v-if="prestataire">
                <div class="profile-header">
                    <img class="profile-picture" :src="prestataire.photo_profil" alt="Photo du prestataire" />
                    <div class="profile-details">
                        <h1>{{ prestataire.nom_utilisateur }} {{ prestataire.prenom_utilisateur }}</h1>
                        <p class="email">{{ prestataire.mail_utilisateur }}</p>
                    </div>
                </div>
                <div class="profile-content">
                    <div class="menu">
                        <h2>Menu</h2>
                        <select v-model="selectedItem">
                            <option value="presentation">Présentation</option>
                            <option v-if="(isAuthenticated && (userID == prestataire.id_utilisateur))" value="profilePicture">Modifier la photo de profil</option>
                            <option value="services">Services</option>
                            <option value="statistiques">Statistiques</option>
                        </select>
                    </div>
                    <div class="dynamic-content">
                        <h2 v-if="selectedItem === 'presentation'">Présentation</h2>
                        <div v-if="selectedItem === 'presentation'">
                            <div v-if="!isEditingDescription">
                                <p v-html="prestataire.editeur_wysiwyg"></p>
                                <button v-if="(isAuthenticated && (userID == prestataire.id_utilisateur))" @click="isEditingDescription = true" class="edit-button">Modifier</button>
                            </div>
                            <div v-else>
                                <vue-editor v-model="prestataire.editeur_wysiwyg"></vue-editor>
                                <div class="edit-buttons">
                                    <button @click="saveDescription" class="save-button">Enregistrer</button>
                                    <button @click="cancelEdit" class="cancel-button">Annuler</button>
                                </div>
                            </div>
                        </div>

                        <template v-else-if="selectedItem === 'profilePicture'">
                            <h2>Modifier la photo de profil</h2>
                            <input type="text" v-model="newProfilePhotoURL" class="input-field" placeholder="Lien de l'image" >
                            <button @click="updateProfilePhoto" class="save-button">Enregistrer</button>
                        </template>

                        <template v-else-if="selectedItem === 'statistiques'">
                            <h2>Statistiques de vos services</h2>
                        </template>

                        <template v-else-if="selectedItem === 'services'">
                            <h2>Services proposés</h2>
                            <ul>
                                <li v-for="(value, key) in prestataire.services_activables" :key="key">
                                    {{ key }}:
                                    <router-link v-if="key === 'Livre d\'or'" :to="`/services/commentaires/${prestataire.id_presta}`" class="service-link">Voir</router-link>
                                    <span v-else-if="key === 'Comptage de visiteurs'">
                    <p class="notice">(visible uniquement par le prestataire)</p>
                  </span>
                                    <router-link v-if="key === 'Les Stands'" :to="`/services/stands/${prestataire.id_presta}`" class="service-link">Voir</router-link>
                                    <router-link v-if="(isAuthenticated && (userID == prestataire.id_utilisateur)) && key === 'Les Montgolfières'" :to="`/services/montgolfieres/${prestataire.id_presta}`" class="service-link">Voir</router-link>
                                    <router-link v-if="!(isAuthenticated && (userID == prestataire.id_utilisateur)) && key === 'Les Montgolfières'" :to="`/presta/montgolfieres/${prestataire.id_presta}`" class="service-link">Voir</router-link>
                                    <button v-if="(isAuthenticated && (userID == prestataire.id_utilisateur)) && key !== 'Comptage de visiteurs'" @click="toggleServiceVisibility(key)" class="toggle-button">{{ value ? 'Désactiver' : 'Activer' }}</button>
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Chargement du profil du prestataire...</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { VueEditor } from 'vue2-editor';
import { updateDescription, updateProfilePhoto } from '@/services/presta.service';
import { mapState, mapGetters } from 'vuex';

export default {
    components: {
        VueEditor,
    },
    data() {
        return {
            prestataire: {},
            selectedItem: 'presentation',
            isEditingDescription: false,
            newProfilePhotoURL: '',
        };
    },
    computed: {
        ...mapState('auth', ['userID']),
        ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
    },
    methods: {
        async toggleServiceVisibility(serviceKey) {
            try {
                const prestataireId = this.$route.params.id;
                const serviceActivationState = !this.prestataire.services_activables[serviceKey];
                await axios.put(`http://localhost:3030/presta/${prestataireId}/services/${serviceKey}`, {
                    activated: serviceActivationState,
                });
                await this.fetchPrestataire();
            } catch (error) {
                console.error('Erreur lors de la modification de la visibilité du service:', error);
            }
        },
        async fetchPrestataire() {
            const prestataireId = this.$route.params.id;
            try {
                const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
                this.prestataire = response.data;
                await this.fetchUtilisateurs();
            } catch (error) {
                console.error('Erreur lors de la récupération des données du prestataire', error);
            }
        },
        async fetchUtilisateurs() {
            try {
                const response = await axios.get('http://localhost:3030/utilisateurs');
                const users = response.data;
                const prestataireUserId = this.prestataire.id_utilisateur;
                const utilisateur = users.find(user => user.id_utilisateur === prestataireUserId);
                if (utilisateur) {
                    this.prestataire = { ...this.prestataire, ...utilisateur };
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        },
        async saveDescription() {
            try {
                const prestataireId = this.$route.params.id;
                const updatedDescription = this.prestataire.editeur_wysiwyg;

                await updateDescription(prestataireId, updatedDescription);
                this.isEditingDescription = false;
                await this.fetchPrestataire();
            } catch (error) {
                console.error('Erreur lors de la sauvegarde de la description:', error);
            }
        },
        async updateProfilePhoto() {
            try {
                const prestataireId = this.$route.params.id;
                if (!this.newProfilePhotoURL) {
                    throw new Error("L'URL de la nouvelle photo de profil est requise.");
                }
                await updateProfilePhoto(prestataireId, this.newProfilePhotoURL);
                this.isEditingPhoto = false;
                await this.fetchPrestataire(); // Cette ligne s'assure que les données du prestataire sont rafraîchies après la mise à jour
                alert('La photo de profil a été mise à jour avec succès.'); // Fournir un feedback visuel à l'utilisateur
            } catch (error) {
                console.error('Erreur lors de la sauvegarde de la photo:', error);
                alert('Erreur lors de la mise à jour de la photo de profil. Veuillez réessayer.'); // Feedback en cas d'erreur
            }
        },
        cancelEdit() {
            this.isEditingDescription = false;
            this.fetchPrestataire();
        },
    },
    async mounted() {
        await this.fetchPrestataire();
    },
};
</script>

<style scoped>
.all {
    margin-top: 9%;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
}

.profile-details {
    flex-grow: 1;
}

.profile-details h1 {
    margin: 0;
    font-size: 24px;
}

.email {
    color: #666;
    margin: 5px 0;
}

.profile-content {
    border-top: 1px solid #ccc;
    padding-top: 20px;
}

.menu h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.menu select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-size: 16px;
    margin-bottom: 20px;
}

.dynamic-content h2 {
    font-size: 20px;
    margin-bottom: 10px;
}


.dynamic-content .input-field{
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
}

.dynamic-content .edit-button,
.dynamic-content .save-button,
.dynamic-content .cancel-button{
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #dc3131;
    color: #fff;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
}

.dynamic-content .edit-button:hover,
.dynamic-content .save-button:hover,
.dynamic-content .cancel-button:hover {
    background-color: #b02424;
}

.dynamic-content .input-field {
    width: calc(100% - 40px);
}

.dynamic-content .notice {
    color: blueviolet;
}

.services ul {
    list-style-type: none;
    padding: 0;
}

.services li {
    margin-bottom: 10px;
}

.service-link {
    display: inline-block;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 10px;
}

.service-link:hover {
    background-color: #0056b3;
}

.toggle-button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.toggle-button:hover {
    background-color: #c82333;
}
</style>
