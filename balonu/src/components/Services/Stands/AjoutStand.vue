<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="standForm.libelle_stand" placeholder="Libellé">
      <input type="text" v-model="standForm.description_stand" placeholder="Description">
      <input type="text" v-model="standForm.image_stand" placeholder="Lien de la photo">
      <select v-model="standForm.id_emplacement" placeholder="ID emplacement">
        <option v-for="emplacement in emplacements" :key="emplacement.id_emplacement" :value="emplacement.id_emplacement">
          {{ emplacement.libelle_emplacement }}
        </option>
      </select>
      <br>
      <select v-model="standForm.id_categorie_stand" placeholder="ID emplacement">
        <option v-for="emplacement in categorieStand" :key="emplacement.id_categorie_stand"
          :value="emplacement.id_categorie_stand">
          {{ emplacement.libelle_categorie_stand }}
        </option>
      </select>
      <button type="submit">Sauvegarder</button>
    </form>

    <h2>Aperçu du Stand</h2>
    <div class="card">
      <img :src="standForm.image_stand" alt="Photo du stand">
      <div class="card-content">
        <div>{{ standForm.libelle_stand }}</div>
        <div>{{ standForm.description_stand }} -> description </div>
        <div>{{ standForm.id_emplacement }} : ID de l'emplacement </div>
        <div>{{ standForm.id_categorie_stand }} : ID de la catégorie du Stand </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex';
import axiosMarche from '@/services/axios.service';

export default {
  data() {
    return {
      standForm: {
        libelle_stand: '',
        description_stand: '',
        image_stand: '',
        id_emplacement: '',
        id_categorie_stand: '',
      },
      stands: [],
      emplacements: [],
      categorieStand: [],
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  methods: {
    async fetchStands() {
        try {
          const response = await axiosMarche.get('/stands');
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
        console.error('Erreur lors de la récupération des emplacements:', error);
      }
    },
    async fetchCategorieStands() {
      try {
        const response = await axiosMarche.get('/categorieStands');
        this.categorieStand = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories de stands:', error);
      }
    },
    async handleSubmit() {
        if (!this.validateForm()) {
          console.error('Validation du formulaire échouée');
          return;
        }
  
        try {
          const url = this.standForm.id_stand
            ? `/stands/${this.standForm.id_stand}`
            : '/stands';
          const method = this.standForm.id_stand ? 'put' : 'post';
  
          await axiosMarche[method](url, this.standForm);
          this.fetchStands();
          this.$router.push('/stands');
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire:', error);
        }
        this.resetForm();
      },
    validateForm() {
      return (
        this.standForm.libelle_stand &&
        this.standForm.description_stand &&
        this.standForm.image_stand && this.standForm.id_emplacement &&
        this.standForm.id_categorie_stand
      );
    },
    resetForm() {
      this.standForm = {
        libelle_stand: '',
        description_stand: '',
        image_stand: '',
        id_emplacement: '',
        id_categorie_stand: '',
      };
    },
  },
  mounted() {
    this.fetchStands();
    this.fetchEmplacements();
    this.fetchCategorieStands();
  },
};
</script>
  
<style scoped>
* {
  padding-top: 5%
}

.card {
  max-width: 380px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 20px auto;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-content {
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  gap: 10px;
}

input[type="text"],
input[type="number"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input[type="checkbox"] {
  align-self: center;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #E30A17;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #bf0a0d;
}

h2 {
  text-align: center;
  margin-top: 30px;
}
</style>
  