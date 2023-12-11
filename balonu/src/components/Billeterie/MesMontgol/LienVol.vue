<template>
    <div class="container">
      <!-- Formulaire pour ajouter/modifier un vol -->
      <div class="form-container">
        <h2>Gestion des Vols</h2>
        <form @submit.prevent="handleVolSubmit">
          <input type="text" v-model="volForm.libelle_vol" placeholder="Libellé du Vol">
          <input type="number" v-model="volForm.prix_vol" placeholder="Prix du Vol">
          <input type="text" v-model="volForm.avis_vol" placeholder="Avis sur le Vol">
          <button type="submit">Sauvegarder le Vol</button>
        </form>
      </div>
  
      <!-- Formulaire pour ajouter/modifier un parcours -->
      <div class="form-container">
        <h2>Gestion des Parcours</h2>
        <form @submit.prevent="handleParcoursSubmit">
          <input type="text" v-model="parcoursForm.libelle_parcours" placeholder="Libellé du Parcours">
          <input type="number" v-model="parcoursForm.distance_parcours" placeholder="Distance du Parcours">
          <input type="text" v-model="parcoursForm.duree_parcours" placeholder="Durée du Parcours">
          <button type="submit">Sauvegarder le Parcours</button>
        </form>
      </div>
  
      <!-- Liste des vols et parcours -->
      <div class="list-container">
        <!-- Liste des vols -->
        <div>
          <h3>Liste des Vols</h3>
          <ul>
            <li v-for="vol in vols" :key="vol.id_vol">
              {{ vol.libelle_vol }} - {{ vol.prix_vol }} € - Avis : {{ vol.avis_vol }}
              <button @click="editVol(vol)">Éditer</button>
              <button @click="deleteVol(vol.id_vol)">Supprimer</button>
            </li>
          </ul>
        </div>
  
        <!-- Liste des parcours -->
        <div>
          <h3>Liste des Parcours</h3>
          <ul>
            <li v-for="parcoursItem in parcours" :key="parcoursItem.id_parcours">
              {{ parcoursItem.libelle_parcours }} - Distance : {{ parcoursItem.distance_parcours }} km - Durée : {{ parcoursItem.duree_parcours }}
              <button @click="editParcours(parcoursItem)">Éditer</button>
              <button @click="deleteParcours(parcoursItem.id_parcours)">Supprimer</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        volForm: {
          id_vol: null,
          libelle_vol: '',
          prix_vol: 0,
          avis_vol: '',
        },
        parcoursForm: {
          id_parcours: null,
          libelle_parcours: '',
          distance_parcours: 0,
          duree_parcours: '',
        },
      };
    },
    computed: {
      ...mapState('parcoursVols', ['vols', 'parcours']),
    },
    methods: {
      ...mapActions('parcoursVols', ['fetchVols', 'fetchParcours', 'createVol', 'updateVol', 'deleteVol', 'createParcours', 'updateParcours', 'deleteParcours']),
      async handleVolSubmit() {
        try {
          if (this.volForm.id_vol) {
            // Modifier un vol existant
            await this.updateVol(this.volForm);
          } else {
            // Créer un nouveau vol
            await this.createVol(this.volForm);
          }
          this.resetVolForm();
          this.fetchVols();
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire de vol:', error);
        }
      },
      async handleParcoursSubmit() {
        try {
          if (this.parcoursForm.id_parcours) {
            // Modifier un parcours existant
            await this.updateParcours(this.parcoursForm);
          } else {
            // Créer un nouveau parcours
            await this.createParcours(this.parcoursForm);
          }
          this.resetParcoursForm();
          this.fetchParcours();
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire de parcours:', error);
        }
      },
      editVol(vol) {
        this.volForm = { ...vol };
      },
      deleteVol(id_vol) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce vol ?')) {
          this.deleteVol(id_vol);
          this.resetVolForm();
          this.fetchVols();
        }
      },
      editParcours(parcours) {
        this.parcoursForm = { ...parcours };
      },
      deleteParcours(id_parcours) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce parcours ?')) {
          this.deleteParcours(id_parcours);
          this.resetParcoursForm();
          this.fetchParcours();
        }
      },
      resetVolForm() {
        this.volForm = {
          id_vol: null,
          libelle_vol: '',
          prix_vol: 0,
          avis_vol: '',
        };
      },
      resetParcoursForm() {
        this.parcoursForm = {
          id_parcours: null,
          libelle_parcours: '',
          distance_parcours: 0,
          duree_parcours: '',
        };
      },
    },
    mounted() {
      this.fetchVols();
      this.fetchParcours();
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding-top: 10%;
  }
  
  .form-container {
    width: 40%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
  
  .list-container {
    width: 40%;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #e30a17;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #bf0a0d;
  }
  </style>