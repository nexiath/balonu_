<template>
<div class="all">
  <div class="services" v-if="showButtons">
    <p>{{ globalVisitorsCount }} personne{{ globalVisitorsCount > 1 ? 's' : '' }} {{ globalVisitorsCount <= 1 ? 'a' : '' }} {{ globalVisitorsCount > 1 ? 'ont' : '' }} consulté ce profil</p>
  </div>
</div>

</template>

<script>
import PrestaService from '@/services/presta.service';
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';


export default {
  data() {
    return {
      globalVisitorsCount: 0,
      prestataire: {},
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
    showButtons() {
      return this.isAuthenticated && ( this.userID == (parseInt(this.prestataireId) + 1));
    },
  },
  methods: {
    async incrementGlobalVisitorsCount() {
      try {
        const prestataireId = this.prestataire.id_presta;
        const currentVisitors = this.prestataire.nombre_visiteurs || 0;
        const response = await PrestaService.incrementVisitors(prestataireId, currentVisitors + 1);
        this.globalVisitorsCount = currentVisitors
        if (response) {
          this.globalVisitorsCount += 1;
        } else {
          console.error('Erreur lors de l\'incrémentation des visiteurs');
        }
      } catch (error) {
        console.error('Erreur lors de l\'incrémentation des visiteurs :', error);
      }
    },

    async fetchPrestataire() {
      const prestataireId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
        this.prestataire = response.data;
        await this.fetchCommentaires();
      } catch (error) {
        console.error('Erreur lors de la récupération des données du prestataire', error);
      }
    },
  },
  created() {
    this.prestataireId = this.$route.params.id;
  },
  async mounted() {
    try {
      await this.fetchPrestataire();
      await this.incrementGlobalVisitorsCount();
    } catch (error) {
      console.error('Erreur lors du chargement des données et de l\'incrémentation du compteur :', error);
    }
  },
};
</script>

<style scoped>
.all{
  margin-top: 10%;
}

.services {
  position: fixed;
  top: 120px; 
  right: 20px; 
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #333;
  background-color: #f8f8f8;
  padding: 8px 12px; 
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



</style>
