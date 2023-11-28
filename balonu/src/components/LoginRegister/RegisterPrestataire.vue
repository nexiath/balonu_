<template>
  <div class="Connexion_Inscription">
    <h1>Inscription</h1>

    <div class="signup-form">
      <form @submit.prevent="signup">
        <input type="text" v-model="userDetails.login_utilisateur" placeholder="Nom d'utilisateur" required />
        <input type="password" v-model="userDetails.mot_de_passe_utilisateur" placeholder="Mot de passe" required />
        <p v-if="userDetails.mot_de_passe_utilisateur && userDetails.mot_de_passe_utilisateur.length < 6">
          Le mot de passe doit contenir au moins 6 caractères.
        </p>

        <input type="text" v-model="userDetails.nom_utilisateur" placeholder="Nom" required />
        <input type="text" v-model="userDetails.prenom_utilisateur" placeholder="Prénom" required />
        <input type="email" v-model="userDetails.mail_utilisateur" placeholder="Email" required />
        
        <input type="text" v-model="userDetails.telephone_utilisateur" placeholder="Téléphone" required />
        <p v-if="userDetails.telephone_utilisateur && userDetails.telephone_utilisateur.length !== 10">
          Le numéro de téléphone doit contenir 10 chiffres.
        </p>

        <input type="text" v-model="userDetails.siret_utilisateur" placeholder="Numéro SIRET" required />
        <p v-if="userDetails.siret_utilisateur && userDetails.siret_utilisateur.length !== 14">
          Le numéro SIRET doit contenir 14 chiffres.
        </p>

        <div>
          <label>
            <input type="radio" value="1" v-model="userDetails.id_role"> Prestataire
          </label>
          <label>
            <input type="radio" value="2" v-model="userDetails.id_role"> Montgolfier
          </label>
        </div>

        <button type="submit" :disabled="!canSubmit">Inscription</button>
      </form>

      <p v-if="message">{{ message }}</p>

      <div class="login-link">
        Vous avez déjà un compte ? <router-link to="/login">Connectez-vous</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      userDetails: {
        login_utilisateur: '',
        mot_de_passe_utilisateur: '',
        nom_utilisateur: '',
        prenom_utilisateur: '',
        mail_utilisateur: '',
        telephone_utilisateur: '',
        siret_utilisateur: '',
        id_role: null
      },
      message: '' 
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    canSubmit() {
      const { login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role } = this.userDetails;
      return (
        login_utilisateur.trim().length > 0 &&
        mot_de_passe_utilisateur.length >= 6 &&
        nom_utilisateur.trim().length > 0 &&
        prenom_utilisateur.trim().length > 0 &&
        mail_utilisateur.trim().length > 0 &&
        telephone_utilisateur.length === 10 &&
        siret_utilisateur.length === 14 &&
        id_role !== null
      );
    }
  },
  methods: {
    ...mapActions('auth', ['inscription']),
    async signup() {
      if (this.canSubmit) {
        try {
          await this.inscription(this.userDetails);
          this.message = "Inscription réussie. Votre demande va être traitée prochainement par un admin.";
          this.$router.push('/incriptionreussi');
        } catch (error) {
          this.message = error.response && error.response.data ? error.response.data.message : "Une erreur s'est produite lors de l'inscription.";
        }
      }
    }
  }
}
</script>

<style scoped>
.Connexion_Inscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 5% auto;
  font-family: 'Poppins', serif;
}

.Connexion_Inscription h1, .Connexion_Inscription h2 {
  color: #464646;
  margin-bottom: 15px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.signup-form input {
  font-family: 'Poppins', serif;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
}

.signup-form button {
  background-color: #E30A17;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.2s ease;
}

.signup-form button:hover {
  background-color: #bf0a15;
}

.signup-form input + button {
  margin-top: 20px;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
  align-self: center;
}

.login-link a {
  color: #E30A17;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>




