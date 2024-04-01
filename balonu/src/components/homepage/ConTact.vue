<template>
  <div class="contact">
    <h1 class="miam">{{ $t('Contact') }}</h1>
    <hr>
    <div class="contact-container">
      <div class="left-section">
        <h3>{{ $t('quetsion') }}</h3>
        <label for="email" >{{ $t('mail') }}</label>
        <input type="email" id="email" class="email" v-model="email">

        <label for="message">{{ $t('mess') }}</label>
        <textarea id="message" class="message" v-model="message"></textarea>

        <button class="send-button">{{ $t('envoyer') }}</button>
      </div>
      <div class="right-section">
        <div id="map"></div>
        <div class="contact-info">
          <div>
            <img src="https://www.larousse.fr/encyclopedie/data/images/1009613-Drapeau_de_la_Turquie.jpg" alt="Drapeau de la Turquie">
            <p>+90 6 13 59 39 45</p>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ensign_of_France.svg/langfr-225px-Ensign_of_France.svg.png" alt="Drapeau de la France">
            <p>+33 6 13 59 39 45</p>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-225px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="Drapeau britannique">
            <p>+44 6 13 59 39 45</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import L from 'leaflet';

export default {
    data() {
        return {
            email: '',
            message: '',
        };
    },
  mounted() {

    const maCarte = L.map('map').setView([38.668997324, 34.836829986], 8);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 100
    }).addTo(maCarte);


    const montgolfiereIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3942/3942105.png',
      iconSize: [40, 45],
      iconAnchor: [19, 47],
      popupAnchor: [0, -47]
    });

    L.marker([38.668997324, 34.836829986], {icon: montgolfiereIcon}).addTo(maCarte)
        .bindPopup('Cappadoce, Turquie')
        .openPopup();
  }
}
</script>

<style scoped>

h3 {
  text-align: left;
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 1em;
}

.contact {
  margin-top: 7%;
  padding-top: 5%;
  padding-bottom: 8%;
  background-color: #1E1E1E;
  color: #ffffff;
  font-family: 'Poppins', 'Arial',serif;
}

.miam {
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

.contact-container {
  padding-top: 5%;
  display: flex;
  justify-content: space-between;
}

.left-section, .right-section {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.left-section label, .left-section input, .left-section textarea {
  width: 80%;
  margin-bottom: 10px;
}

.send-button {
  margin-top: 20px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 300px;
  height: 40px;
  font-size: 20px;
}

#map {
  width: 600px;
  height: 400px;
  border: 2px solid #ccc;
  margin: 20px auto;
  border-radius: 10px;
  z-index: 100;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.contact-info > div {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-weight: 300;
}

.contact-info img {
  width: 50px;
  margin-right: 10px;
}

input.email#email{
  padding: 9px;
  border-radius: 10px;
  width: 100%;
}

textarea.message{
  padding: 30px;
  border-radius: 10px;
  width: 100%;
}

label {
  font-weight: 300;
  color: #9B9B9B;
}

@media only screen
and (max-width : 1270px) {
  div.contact-container {
    flex-direction: column;
    align-items: center;
  }

  .left-section label {
    width: 100%;
  }

  div.right-section {
    width: 100%;
    order: 1;
  }

  div.left-section {
    width: 80%;
    order: 2;
    margin-top: 2em;
  }

  div#map {
    width: 80%;
  }

  div.left-section {
    align-items: center;
  }
}
</style>
