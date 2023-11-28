<template>
  <div class="Connexion">
    <h1>Connexion</h1>
    <form @submit.prevent="submitLogin">
      <input
        type="text"
        v-model="userCredentials.login_utilisateur"
        placeholder="Nom d'utilisateur"
      />
      <input
        type="password"
        v-model="userCredentials.mot_de_passe_utilisateur"
        placeholder="Mot de passe"
      />
      <button type="submit">Connexion</button>
    </form>
    <div class="register-link">
      Vous n'avez pas encore de compte ? <router-link to="/register">Inscrivez-vous</router-link>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogIn',
  data() {
    return {
      userCredentials: {
        login_utilisateur: '',
        mot_de_passe_utilisateur: ''
      }
    };
  },
  methods: {
    ...mapActions('auth', {
      loginAction: 'login'
    }),

    async submitLogin() {
  try {
    const loginSuccess = await this.loginAction(this.userCredentials);
    if (loginSuccess) {
      this.$router.replace('/moncompte').then(() => {
        window.location.reload();
      });
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
    }
  } catch (error) {
    console.error(error); 
    alert("Une erreur s'est produite lors de la tentative de connexion.");
  }
}
  }
};
</script>

<style scoped>
* {
  padding-top: 5%;
}

.Connexion {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 5% auto;
  font-family: 'Poppins', serif;
}

.Connexion h1 {
  color: #464646;
  margin-bottom: 20px;
}

.Connexion form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.Connexion input {
  font-family: 'Poppins', serif;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
}

.Connexion button {
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

.Connexion button:hover {
  background-color: #bf0a15;
}

/* Ajout d'un peu d'espace entre les champs de saisie et le bouton */
.Connexion input + button {
  margin-top: 20px;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #E30A17;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>

