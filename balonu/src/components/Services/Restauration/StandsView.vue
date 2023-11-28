<template>
  <div class="container">
    <h2>Stands</h2>
    <button v-if="isAuthenticated && (userIdRole = 1)" @click="redirectAddStand">Créer un Stand</button>
    <ul class="card-container">
      <li class="card" v-for="stand in filteredStands" :key="stand.id_stand">
        <div class="image-container" @click="redirectToProducts(stand.id_stand)">
          <img :src="stand.image_stand" alt="Image description">
        </div>
        <div v-if="editingStandId === stand.id_stand">
          <div class="card-content">
            <input type="text" v-model="stand.libelle_stand" placeholder="Libellé">
            <input type="text" v-model="stand.description_stand" placeholder="Description">
            <input type="text" v-model="stand.image_stand" placeholder="Lien de la photo">
            <select v-model="stand.id_emplacement" placeholder="ID emplacement">
              <option v-for="emplacement in emplacements" :key="emplacement.id_emplacement"
                :value="emplacement.id_emplacement">
                {{ emplacement.libelle_emplacement }}
              </option>s
            </select>
            <br>
            <select v-model="stand.id_categorie_stand" placeholder="ID emplacement">
              <option v-for="categorieStands in categorieStand" :key="categorieStands.id_categorie_stand"
                :value="categorieStands.id_categorie_stand">
                {{ categorieStands.libelle_categorie_stand }}
              </option>
            </select>
            <div class="button-container">
              <button @click="saveStand(stand)">Sauvegarder</button>
              <button @click="cancelEdit()">Annuler</button>
            </div>
          </div>
        </div>
        <div v-else class="card-content">
          <div class="names">{{ stand.libelle_stand }}</div>
          <div class="description">{{ stand.description_stand }}</div>
          <div class="button-container">
            <button v-if="isAuthenticated && userID === stand.id_utilisateur" @click="editStand(stand)">Modifier</button>
            <button v-if="isAuthenticated && userID === stand.id_utilisateur" @click="deleteStand(stand.id_stand)">Supprimer</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex';
import standService from '@/services/stands.service';
import axiosMarche from '@/services/axios.service';


export default {
  data() {
    return {
      stands: [],
      emplacements: [],
      categorieStand: [],
      editingStandId: null,
    };
  },

  computed: {
    filteredStands() {
      const filtered = this.stands.map(stand => {
        if (stand.id_stand === this.editingStandId) {
          return { ...stand, id_categorie_stand: this.editedStand.id_categorie_stand };
        }
        return stand;
      });

      return filtered.filter(stand => stand.id_categorie_stand === 1 || stand.id_stand === this.editingStandId);
    },
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },

  methods: {
    redirectToProducts(id_stand) {
      this.$router.push(`/relations/produitsByStand/${id_stand}`);
    },
    redirectAddStand() {
      this.$router.push('/ajoutstand');
    },
    async fetchStands() {
      try {
        const response = await axiosMarche.get(`/stands`);
        this.stands = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des stands:', error);
      }
    },
    async fetchEmplacements() {
      try {
        const response = await axiosMarche.get('/emplacements');
        this.emplacements = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des stands:', error);
      }
    },
    async fetchCategoriesStand() {
      try {
        const response = await axiosMarche.get('/categorieStands');
        this.categorieStand = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des categorie_stand:', error);
      }
    },
    editStand(stand) {
      if (this.userID === stand.id_utilisateur) {
        this.editingStandId = stand.id_stand;
        this.editedStand = { ...stand };
      } else {
        alert("Vous n'êtes pas autorisé à modifier ce stand.");
        
      }
    },

    async saveStand(stand) {
      try {
        await standService.updateStand(
          stand.id_stand,
          stand.libelle_stand,
          stand.description_stand,
          stand.image_stand,
          stand.id_emplacement,
          stand.id_categorie_stand
        );
        this.editingStandId = null;
        this.fetchStands();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du stand:', error);
      }
    },

    cancelEdit() {
      this.editingStandId = null;
      this.fetchStands();
    },
    async deleteStand(id_stand) {
      try {
        const response = await axiosMarche.delete(`/stands/${id_stand}`);
        this.stands = response.data;
        this.fetchStands();
      } catch (error) {
        console.error('Erreur lors de la suppression du stand:', error);
        alert("Erreur lors de la suppression du stand.");
      }
    },
  },
  mounted() {
    this.fetchStands();
    this.fetchEmplacements();
    this.fetchCategoriesStand();
  }
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

label {
  display: flex;
  align-items: center;
  font-size: 16px;
}
</style>
