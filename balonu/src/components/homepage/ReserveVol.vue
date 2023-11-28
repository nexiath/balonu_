<template>
  <div class="services">
      <h1>RÉSERVER UN VOL</h1>
      <hr>
      <div class="card-container">
          <div class="card" v-for="(montgolfiere) in montgolfieres.slice(0, 3)" :key="montgolfiere.id_montgolfiere">
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
  },
  mounted() {
      this.fetchMontgolfieres();
  },
  computed: {
      ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),

  }
};
</script>


<style scoped>
.services{
  padding-top: 5%;
  padding-bottom: 8%;
  background-color: #ffffff;
  color: #1E1E1E;
font-family: 'Poppins', 'Arial',serif;
}

h1{
text-align: center;
font-family: 'Poppins', 'Arial',serif;
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
  height: 100vh;
  background-color: #f4f4f4;
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
  background-color: #f5f5f5;
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  overflow: hidden;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border: 0;
  border-bottom: #E30A17 15px solid;
}


.card img {
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 20px;
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
  bottom: 8px;
  left: 20px;
  color: #9B9B9B;
  font-weight: 300;
  font-size: 16px;
}
.prices{
  color: #464646;
  padding-left: 0;
text-align: center;
  font-weight: normal;
  font-size: 20px;
}

.names {
  text-align: center;
  margin-top: 2em;
  color: #464646;
  font-size: 19px;
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
  bottom: 90px;
  left: 30px;
  font-size: 14px;
}

.duration-box {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid red;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.caracteristiques {
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
padding: 0;
margin: 0;
align-items: center;
}

.caracteristiques > span {
max-width: 50%;
font-size: 14px;
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
text-align: center;
cursor: pointer;
}

.explore {
  position: absolute;
  bottom: 16px;
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

span.black-arrow {
color: #010101;
}

@media only screen
and (max-width : 715px) {

h1 {
  max-width: 80%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}

div.card {
  margin-bottom: 1em;
}

div.card:first-child {
  margin-top: 2em;
}

div.card:last-child {
  margin-bottom: 1em;
}

}

</style>