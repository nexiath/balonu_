<template>
  <div class="flop">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="montgolfiereForm.libelle_montgolfiere" placeholder="Libellé">
      <input type="number" v-model="montgolfiereForm.nombre_place" placeholder="Nombre de places">
      <input type="text" v-model="montgolfiereForm.photo_montgolfiere" placeholder="Lien de la photo">
      <input type="checkbox" v-model="montgolfiereForm.montgolfiere_est_active"> Actif

      <select v-model="montgolfiereForm.id_vol">
        <option disabled value="">Sélectionnez un vol</option>
        <option v-for="vol in vols" :value="vol.id_vol" :key="vol.id_vol">{{ vol.libelle_vol }}</option>
      </select>

      <button type="submit">Sauvegarder</button>
    </form>

    <h2>Aperçu de la Montgolfière</h2>
    <div class="card">
      <img :src="montgolfiereForm.photo_montgolfiere" alt="Photo de la montgolfière">
      <div class="card-content">
        <div>{{ montgolfiereForm.libelle_montgolfiere }}</div>
        <div>{{ montgolfiereForm.nombre_place }} places</div>
        <div>Statut : {{ montgolfiereForm.montgolfiere_est_active ? 'Actif' : 'Inactif' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import axiosMarche from '@/services/axios.service';

export default {
  data() {
    return {
      montgolfiereForm: {
        id_montgolfiere: null,
        nombre_place: '',
        libelle_montgolfiere: '',
        photo_montgolfiere: '',
        montgolfiere_est_active: false,
        id_vol: null
      },
      montgolfieres: [],
      vols: []
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  methods: {
    async fetchMontgolfieres() {
      try {
        const response = await axiosMarche.get('/montgolfieres');
        this.montgolfieres = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des montgolfières:', error);
      }
    },
    async fetchVols() {
      try {
        const response = await axiosMarche.get('/vols');
        this.vols = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des vols:', error);
      }
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        console.error('Validation du formulaire échouée');
        return;
      }

      try {
        const url = this.montgolfiereForm.id_montgolfiere
            ? `/montgolfieres/${this.montgolfiereForm.id_montgolfiere}`
            : '/montgolfieres';
        const method = this.montgolfiereForm.id_montgolfiere ? 'put' : 'post';

        await axiosMarche[method](url, this.montgolfiereForm);
        this.fetchMontgolfieres();
        this.$router.push('/billeterie');
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
      this.resetForm();
    },
    validateForm() {
      return (
          this.montgolfiereForm.libelle_montgolfiere &&
          this.montgolfiereForm.nombre_place &&
          this.montgolfiereForm.photo_montgolfiere &&
          this.montgolfiereForm.id_vol // Assurez-vous que le vol est sélectionné
      );
    },
    resetForm() {
      this.montgolfiereForm = {
        id_montgolfiere: null,
        nombre_place: '',
        libelle_montgolfiere: '',
        photo_montgolfiere: '',
        montgolfiere_est_active: false,
        id_vol: null
      };
    },
    editMontgolfiere(montgolfiere) {
      this.montgolfiereForm = { ...montgolfiere };
    },
    async deleteMontgolfiere(id_montgolfiere) {
      try {
        await axiosMarche.delete(`/montgolfieres/${id_montgolfiere}`);
        this.fetchMontgolfieres();
      } catch (error) {
        console.error('Erreur lors de la suppression de la montgolfière:', error);
      }
    },
  },
  mounted() {
    this.fetchMontgolfieres();
    this.fetchVols();
  }
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
