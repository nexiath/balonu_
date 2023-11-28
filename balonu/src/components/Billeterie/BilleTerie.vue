<template>
  <div class="container tout">
    <h1>Bienvenue sur la billetterie des <b>montgolfières</b></h1>
    <form class="input">
      <input class="filtre" type="search" id="recherche" v-model="recherche" placeholder="Rechercher une montgolfière">
      <select class="filtre cat" name="categorie" id="categorie" v-model="categorie">
        <option value="">Catégorie</option>
        <option value="1">Grosse</option>
        <option value="2">Petite</option>
        <option value="3">Habité</option>
        <option value="4">Magnifique</option>
        <option value="5">Parade</option>
      </select>
      <select class="filtre trier" name="tri" id="tri" v-model="tri">
        <option value="">Trier par</option>
        <option value="1">Prix croissant</option>
        <option value="2">Prix décroissant</option>
        <option value="3">A-Z</option>
        <option value="4">Z-A</option>
      </select>
    </form>
    <router-link to="/ajoutmontgolfiere">
  <button class="ajout-bouton" v-if="isAuthenticated && (userIdRole === 2)">
    Ajouter une Montgolfiere
  </button>
</router-link>


    <div class="card-container">
      <div class="card" v-for="montgolfiere in montgolfieres" :key="montgolfiere.id_montgolfiere">
        <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière">
        <div class="card-content">
          <div class="duration-box">
            <span>{{ montgolfiere.libelle_montgolfiere }}</span>
            <span>{{ montgolfiere.nombre_place }} places</span>
          </div>
          <div class="names">
            <div>{{ montgolfiere.libelle_montgolfiere }}</div>
            <div>{{ montgolfiere.libelle_montgolfiere }}</div>
          </div>
          <div class="location">{{ montgolfiere.libelle_montgolfiere }} </div>
          <hr class="barre">
          <div class="price">À partir de : <div class="prices">{{ montgolfiere.nombre_place }} €</div></div>
          <router-link to="/prestataire">
            <a class="explore">Explorer →</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axiosMarche from '@/services/axios.service';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      montgolfieres: [], 
      recherche: '',
      categorie: '',
      tri: '',
    };
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
    saveSearchParams() {
      localStorage.setItem('rechercheMontgolfiere', this.recherche);
      localStorage.setItem('categorieMontgolfiere', this.categorie);
      localStorage.setItem('triMontgolfiere', this.tri);
    },
    loadSearchParams() {
      this.recherche = localStorage.getItem('rechercheMontgolfiere') || '';
      this.categorie = localStorage.getItem('categorieMontgolfiere') || '';
      this.tri = localStorage.getItem('triMontgolfiere') || '';
    }
  },
  watch: {
  recherche() {
    this.saveSearchParams();
  },
  categorie() {
    this.saveSearchParams();
  },
  tri() {
    this.saveSearchParams();
  }
},
  mounted() {
    this.loadSearchParams();
    this.fetchMontgolfieres(); 
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
    filteredMontgolfieres() {
      return this.montgolfieres
        .filter(montgolfiere => {
          let matchesSearch = this.recherche === '' || montgolfiere.libelle_montgolfiere.toLowerCase().includes(this.recherche.toLowerCase());
          let matchesCategory = this.categorie === '' || montgolfiere.categorie === this.categorie; 
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch (this.tri) {
            case '1':
              
              return a.prix - b.prix; 
            case '2':
              return b.prix - a.prix;
            case '3':
              return a.libelle_montgolfiere.localeCompare(b.libelle_montgolfiere);
            case '4':
              return b.libelle_montgolfiere.localeCompare(a.libelle_montgolfiere);
            default:
              return 0;
          }
        });
    }
  }
};
</script>

<style scoped>

body {
  background-color: #fcfcfc;
}

.tout{
  padding-top: 10%;
}

div.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 5em;
  margin-right: 5em;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  color: #464646;
  font-weight: normal;
  text-align: center;
  border-bottom: 3px #E30A17 solid;
  width: 66%;
  padding-bottom: 0.5em;
}

h1 > b {
  font-weight: bold;
}

form{
  margin: 40px;
}

.card-container {
  padding-top: 3%;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.card {
  max-width: 380px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f5f5f5;
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  overflow: hidden;

}

.card img {
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 15px;
}

.card-content {
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
}

.price {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #9B9B9B;
  font-weight: bold;
  font-size: 16px;
}
.prices{
  color: #464646;
  padding-left: 30px;
  font-weight: normal;
  font-size: 20px;
}

.names {
  text-align: center;
  margin-top: 20px;
  color: #464646;
  font-size: 24px;
}

.barre {
  position: absolute;
  top: 60%;
  width: 90%;
  left: 20px;
  border: 1px solid #ccc;
}

.location {
  position: absolute;
  bottom: 110px;
  left: 30px;
}

.duration-box {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2.5px solid red;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.duration-box span:first-child {
  flex: 2;
  text-align: center;
}

.duration-box span:last-child {
  flex: 1;
  text-align: left;
}

.stars {
  flex: 1;
  text-align: right;
  cursor: pointer;
}

.explore {
  position: absolute;
  bottom: 25px;
  right: 10px;
  color: #E30A17;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.explore::after {
  margin-left: 5px;
  color: #820e00;
}

.star {
  cursor: pointer;
  transition: color 0.3s;
}

.star.active {
  color: yellow;
}

.filtre{
  margin:10px;
  width: 600px;
  height: 35px;
  border-radius: 5px;
  font-size: 17px;
}

.filtre.trier{
  width: 200px;
}

.filtre.cat {
  width: 200px;
}


.ajout-bouton {
    background-color: #E30A17; /* Gris bleu doux */
    color: #ffffff; /* Couleur du texte plus foncée pour le contraste */

    border: 1px solid #d3d3d3; /* Bordure plus subtile */
    padding: 4px 28px;
    font-family: 'Poppins', serif;
    font-size: 18px; /* Taille de police légèrement plus petite */
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 280px; /* Légèrement plus étroit */
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.ajout-bouton:hover {
    transform: scale(0.95);
    box-shadow: 0px 2px 3px rgba(34, 34, 34, 0.15); /* Ombre plus légère */
}

</style>