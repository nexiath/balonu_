<template>
  <div class="planning-container">
    <button @click="changerSemaine(-1)">← Semaine précédente</button>
    <div class="planning">
      <div class="jour" v-for="(jour, index) in jours" :key="index">
        <h3>{{ formatDate(jour) }}</h3>
        <div class="creneau" v-for="heure in heures" :key="heure">
          <h4>{{ heure }}</h4>
          <div class="vol" v-for="montgolfiere in montgolfieres" :key="montgolfiere.id" :class="{ inactif: !montgolfiere.actif }">
            <div v-if="heureIsInRange(jour, heure, montgolfiere.date_debut, montgolfiere.date_fin)">
              {{ montgolfiere.libelle_montgolfiere }}
              <img :src="getMontgolfiereImage(montgolfiere.id_montgolfiere)" alt="Miniature de montgolfière" class="miniature">
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="changerSemaine(1)">Semaine suivante →</button>
  </div>
</template>

<script>
import axios from 'axios';
import { format, startOfWeek, addDays } from 'date-fns';

export default {
  data() {
    return {
      montgolfieres: [],
      dateCourante: new Date(),
      heures: Array.from({ length: 16 }, (_, i) => `${5 + i}:00`),
      heureDebut: '05:00', 
      heureFin: '20:00',  
    };
  },
  computed: {
    jours() {
      const start = startOfWeek(this.dateCourante, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    },
  },
  methods: {
    async fetchMontgolfieres() {
      try {
        const response = await axios.get('http://localhost:3030/montgolfieres');
        this.montgolfieres = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des montgolfières:', error);
      }
    },
    getMontgolfiereImage(montgolfiereId) {
      const montgolfiere = this.montgolfieres.find(m => m.id_montgolfiere === montgolfiereId);
      return montgolfiere ? montgolfiere.photo_montgolfiere : 'default-image.jpg';
    },
    formatDate(date) {
      return format(date, 'dd/MM/yyyy');
    },
    changerSemaine(nombre) {
      this.dateCourante = addDays(this.dateCourante, nombre * 7);
    },
    heureIsInRange(jour, heure, dateDebut, dateFin) {
  const heureDebut = new Date(dateDebut);
  const heureFin = new Date(dateFin);
  const heureCompare = new Date(jour.getFullYear(), jour.getMonth(), jour.getDate(), heure.split(':')[0], heure.split(':')[1]);

  return heureCompare >= heureDebut && heureCompare <= heureFin;
},
  },
  created() {
    this.fetchMontgolfieres();
  }
};
</script>

<style scoped>
.planning-container {
  padding-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.planning {
  display: flex;
  overflow-x: auto;
}

.jour {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.creneau {
  margin-top: 10px;
  padding: 5px;
  border-top: 1px solid #eee;
}

.vol {
  padding: 5px;
  margin-top: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.vol:hover {
  background-color: #e0e0e0;
}

.vol.inactif {
  color: grey;
  cursor: not-allowed;
  text-decoration: line-through;
}

.montgolfiere-info {
  margin-bottom: 5px;
}

.miniature {
  width: 50px;
  height: auto;
}
</style>
