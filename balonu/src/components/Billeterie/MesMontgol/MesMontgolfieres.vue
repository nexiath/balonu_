<template>
  <div class="container">
    <h2>Mes Montgolfières</h2>
    <ul class="card-container">
      <li class="card" v-for="montgolfiere in montgolfieresUtilisateur" :key="montgolfiere.id_montgolfiere">
        <div v-if="editingMontgolfiereId === montgolfiere.id_montgolfiere">
          <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière" class="montgolfiere-image">
          <div class="card-content">
            <input type="text" v-model="montgolfiere.libelle_montgolfiere">
            <input type="number" v-model="montgolfiere.nombre_place">
            <input type="text" v-model="montgolfiere.photo_montgolfiere" placeholder="Lien de la photo">
            <label>
              <input type="checkbox" v-model="montgolfiere.montgolfiere_est_active"> Actif
            </label>
            <div class="button-container">
              <button @click="saveMontgolfiere(montgolfiere)">Sauvegarder</button>
              <button @click="cancelEdit()">Annuler</button>
            </div>
          </div>
        </div>
        <div v-else class="card-content">
          <div class="names">{{ montgolfiere.libelle_montgolfiere }}</div>
          <div class="prices">{{ montgolfiere.nombre_place }} places</div>
          <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière" class="montgolfiere-image">
          <div class="button-container">
            <button @click="editMontgolfiere(montgolfiere)">Modifier</button>
            <button @click="deleteMontgolfiere(montgolfiere.id_montgolfiere)">Supprimer</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import axiosMarche from '@/services/axios.service';

export default {
  data() {
    return {
      montgolfieresUtilisateur: [],
      editingMontgolfiereId: null,
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
  },
  methods: {
    async fetchMontgolfieresUtilisateur() {
      try {
        const response = await axiosMarche.get(`/montgolfieres/utilisateur/${this.userID}`);
        this.montgolfieresUtilisateur = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des montgolfières de l’utilisateur:', error);
      }
    },
    editMontgolfiere(montgolfiere) {
      this.editingMontgolfiereId = montgolfiere.id_montgolfiere;
    },
    async saveMontgolfiere(montgolfiere) {
      try {
        await axiosMarche.put(`/montgolfieres/${montgolfiere.id_montgolfiere}`, montgolfiere);
        this.editingMontgolfiereId = null;
        this.fetchMontgolfieresUtilisateur();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la montgolfière:', error);
      }
    },
    cancelEdit() {
      this.editingMontgolfiereId = null;
      this.fetchMontgolfieresUtilisateur();
    },
    async deleteMontgolfiere(id_montgolfiere) {
      try {
        
        await axiosMarche.delete(`/montgolfieres/${id_montgolfiere}/related-data`);

        
        await axiosMarche.delete(`/montgolfieres/${id_montgolfiere}`);

        
        this.fetchMontgolfieresUtilisateur();
      } catch (error) {
        console.error('Erreur lors de la suppression de la montgolfière:', error);
        alert("Erreur lors de la suppression de la montgolfière.");
      }
    },
  },
  mounted() {
    this.fetchMontgolfieresUtilisateur();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  width: 100%;
}

li {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

li:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.button-container button {
  margin: 0 5px;

}

.card-content {
  padding: 15px;
}

.card-content div,
.card-content label {
  margin-bottom: 10px;
}

.montgolfiere-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

button {
  background-color: #ff0000;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #a04545;
}

button:active {
  background-color: #7d3535;
}

.names {
  font-size: 20px;
  text-align: center;
  color: #333;
}

.prices {
  font-size: 18px;
  text-align: center;
  color: #666;
}

label {
  display: flex;
  align-items: center;
  font-size: 16px;
}
</style>

