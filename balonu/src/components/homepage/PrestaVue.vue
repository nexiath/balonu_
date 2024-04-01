<template>
  <div class="services">
    <h1>{{ $t('presta') }}</h1>
    <hr>

    <div class="input">
      <input class="filtre" type="text" v-model="searchQuery" :placeholder="$t('Recherche')" />
      <select class="filtre cat" v-model="selectedRole">
        <option value="">{{ $t('role') }}</option>
        <option value="1">{{ $t('Prestataires') }}</option>
        <option value="2">{{ $t('Montgolfier') }}</option>
      </select>
    </div>

    <div class="card-container">
      <div v-for="(user) in filteredUsers" :key="user.id_utilisateur">
        <div v-if="user.id_role === 2 || user.id_role === 1" class="card">
          <img :src="getUserPrestataire(user.id_utilisateur).photo_profil" alt="Photo de profil">
          <div class="card-content">
            <div class="names">
              <div><b>{{ user.nom_utilisateur }}</b></div>
              <div><b>{{ user.mail_utilisateur }}</b></div>
            </div>
          </div>
          <div class="add-button-container">
            <router-link :to="`/presta/${getUserPrestataire(user.id_utilisateur).id_presta}`" >
              <button class="add-button">{{ $t('Profil') }}</button>
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMarche from '@/services/axios.service';

export default {
  data() {
    return {
      users: [],
      prestataires: [],
      searchQuery: '',
      selectedRole: '',
    };
  },
  computed: {
    filteredUsers() {
      let filtered = this.users.filter(user => {
        const nameMatch = user.nom_utilisateur.toLowerCase().includes(this.searchQuery.toLowerCase());

        const roleMatch = this.selectedRole === '' || user.id_role.toString() === this.selectedRole;

        return nameMatch && roleMatch;
      });

      return filtered;
    },
  },
  methods: {
    async fetchUtilisateurs() {
      try {
        const response = await axiosMarche.get('/utilisateurs');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    async fetchPrestataires() {
      try {
        const response = await axiosMarche.get('/presta');
        this.prestataires = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires:', error);
      }
    },
    getUserPrestataire(userId) {
      const utilisateur = this.users.find(user => user.id_utilisateur === userId);
      if (utilisateur) {
        return this.prestataires.find(prestataire => prestataire.id_utilisateur === utilisateur.id_utilisateur) || {};
      }
      return {};
    },
  },
  mounted() {
    this.fetchUtilisateurs();
    this.fetchPrestataires();
  },
};
</script>

<style scoped>
.services {
  padding: 5% 0 8%;
  background-color: #ffffff;
  color: #1e1e1e;
  font-family: 'Poppins', 'Arial', serif;
}

h1 {
  text-align: center;
  font-family: 'Poppins', 'Arial', serif;
  margin-bottom: 20px;
}

hr {
  display: block;
  width: 20%;
  margin: 0.5% auto 0 auto;
  border-color: red;
  border-style: solid;
  border-width: 1px;
}

body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  margin: 0;
}

.input {
  margin-top: 2%;
  margin-left: 20%;
}

.card-container {
  padding-top: 3%;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: gainsboro;
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  overflow: hidden;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border: 0;
  border-bottom: #e30a17 4px solid;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.filtre {
  margin: 10px;
  width: 600px;
  height: 35px;
  border-radius: 5px;
  font-size: 17px;
}

.filtre.cat {
  width: 200px;
}

.add-button {
  width: 100%;
  background-color: grey;
  color: white;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}

.card-content {
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.names {
  color: #464646;
  font-size: 19px;
}

.names {
  text-align: center;
  color: #464646;
  font-size: 19px;
}

@media only screen and (max-width: 715px) {
  h1 {
    max-width: 80%;
    text-align: center;
    margin: 1em auto;
  }

  .card {
    margin-bottom: 1em;
  }

  .card:first-child {
    margin-top: 2em;
  }

  .card:last-child {
    margin-bottom: 1em;
  }
}
</style>