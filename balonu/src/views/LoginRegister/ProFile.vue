<template>
  <div class="Profile">
    <h1>Profil de l'utilisateur</h1>
    <div v-if="loading">
      Chargement des informations de l'utilisateur...
    </div>
    <div v-else>
      <p v-if="isAuthenticated && (userIdRole === 2)">Role: Montgolfier</p>
      <p v-if="isAuthenticated && (userIdRole === 1)">Role: Prestataire</p>
      <p v-if="isAuthenticated && (userIdRole === 3)">Role: Admin</p>
      <br>
      <div v-if="!editing">
        <p>Nom d'utilisateur: {{ userDetails.login_utilisateur }}</p>
        <p>Nom: {{ userDetails.nom_utilisateur }}</p>
        <p>Prénom: {{ userDetails.prenom_utilisateur }}</p>
        <p>Email: {{ userDetails.mail_utilisateur }}</p>
        <p>Téléphone: {{ userDetails.telephone_utilisateur }}</p>
        <p>Numéro SIRET: {{ userDetails.siret_utilisateur }}</p>
        <button @click="startEditing">Modifier</button>
      </div>
      <div v-else>
        <label for="login">Nom d'utilisateur:</label>
        <input type="text" id="login" v-model="userDetails.login_utilisateur"><br>
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="userDetails.nom_utilisateur"><br>
        <label for="prenom">Prénom:</label>
        <input type="text" id="prenom" v-model="userDetails.prenom_utilisateur"><br>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="userDetails.mail_utilisateur"><br>
        <label for="tel">Téléphone:</label>
        <input type="tel" id="tel" v-model="userDetails.telephone_utilisateur"><br>
        <label for="siret">Numéro SIRET:</label>
        <input type="text" id="siret" v-model="userDetails.siret_utilisateur"><br>
        <button @click="saveChanges">Enregistrer</button>
        <button @click="cancelEditing">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState,mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  data() {
    return {
      loading: true,
      editing: false,
      userDetailsCopy: {},
    };
  },
  methods: {
    initializeUserData() {
      const id_utilisateur = localStorage.getItem('userID');
      if (id_utilisateur) {
        this.$store.dispatch('auth/fetchUserDetails', id_utilisateur)
          .then(() => {
            this.userDetailsCopy = { ...this.userDetails }; 
            this.loading = false;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
            this.loading = false;
          });
      } else {
        console.error('ID utilisateur non trouvé dans le localStorage');
        this.loading = false;
      }
    },
    startEditing() {
      this.editing = true;
    },
    async saveChanges() {
      try {
        await axios.put(`http://localhost:3030/utilisateurs/${this.userDetails.id_utilisateur}`, {
          login_utilisateur: this.userDetails.login_utilisateur,
          mot_de_passe_utilisateur: this.userDetails.mot_de_passe_utilisateur,
          nom_utilisateur: this.userDetails.nom_utilisateur,
          prenom_utilisateur: this.userDetails.prenom_utilisateur,
          mail_utilisateur: this.userDetails.mail_utilisateur,
          telephone_utilisateur: this.userDetails.telephone_utilisateur,
          siret_utilisateur: this.userDetails.siret_utilisateur,
          id_role: this.userDetails.id_role,
        });
        this.userDetailsCopy = { ...this.userDetails };
        this.editing = false;
        console.log('Modifications enregistrées avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des modifications:', error);
        this.userDetails = { ...this.userDetailsCopy };
      }
    },

    cancelEditing() {
      this.userDetails = { ...this.userDetailsCopy };
      this.editing = false;
    },
  },
  created() {
    this.initializeUserData();
  },
  watch: {
    isAuthenticated() {
      this.initializeUserData();
    },
  },
}
</script>

<style scoped>
* {
  padding-top: 5%;
}

.Profile {
  max-width: 600px;
  margin: 2% auto;
  padding: 2%;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding-top: 5%;

}

.Profile h1 {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.Profile div {
  margin-bottom: 10px;
}

.Profile p {
  color: #555;
  font-size: 16px;
  line-height: 1.5;
  margin-left: 20px;
}
.loading-message {
  text-align: center;
  color: #888;
  font-style: italic;
}


button {
    background-color: #E30A17;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.2s ease;
    margin: 10px ;
}/* Ajout d'un peu d'espace entre les champs de saisie et le bouton */

.Profile input + button {
    margin: 20px;
}


.Profile button:hover {
    background-color: #bf0a15;
}
</style>

