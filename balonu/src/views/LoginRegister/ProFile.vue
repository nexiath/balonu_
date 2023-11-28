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
      <p>Nom d'utilisateur: {{ userDetails.login_utilisateur }}</p>
      <p>Nom: {{ userDetails.nom_utilisateur }}</p>
      <p>Prénom: {{ userDetails.prenom_utilisateur }}</p>
      <p>Email: {{ userDetails.mail_utilisateur }}</p>
      <p>Téléphone: {{ userDetails.telephone_utilisateur }}</p>
      <p>Numéro SIRET: {{ userDetails.siret_utilisateur }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    initializeUserData() {
      const id_utilisateur = localStorage.getItem('userID');
      if (id_utilisateur) {
        this.$store.dispatch('auth/fetchUserDetails', id_utilisateur)
          .then(() => {
            this.loading = false;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
          });
      } else {
        console.error('ID utilisateur non trouvé dans le localStorage');
        this.loading = false;
      }
    }
  },
  created() {
    this.initializeUserData();
  }
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

/* Style pour le message de chargement */
.loading-message {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>

