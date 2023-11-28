<template>
  <div class="propos">
    <div class="txt">
      <div class="apropos">
        <h1>À propos</h1>
      </div>
      <div class="content">
        <p class="txt1_1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue ipsum velit,
          at gravida lectus venenatis ut. Ut id aliquet ipsum. In at rhoncus ligula.
          <br><br>
          Cras efficitur vitae dolor vel semper. Nullam maximus elit neque, non molestie ipsum bibendum fermentum.
          Quisque pretium magna ipsum, ut suscipit dolor porta sit amet. Morbi hendrerit egestas nisi,
          id facilisis urna iaculis id. Mauris auctor, odio in bibendum pharetra, lorem arcu venenatis velit, ac porta leo mauris ac diam.
          <br><br>
          Sed sit amet fermentum leo. Aliquam pellentesque, turpis eu pharetra euismod,
          turpis erat semper quam, sit amet semper turpis urna vel leo. Praesent aliquam pulvinar eros,
          et dictum nunc blandit sit amet. Vivamus egestas pretium imperdiet. Fusce quis tellus id velit sollicitudin pretium ut quis lacus.
        </p>
        <img src="../assets/background.jpg" alt="Picture" class="picture">
      </div>
      <div class="equipe">
        <h1>Notre équipe</h1>
      </div>
      <div class="content2">
        <div class="case">
          <img src="../assets/elmir.jpg" alt="Picture" class="elmir_img">
          <div class="prenom">
            <span class="nom">Elmir <strong>Gerovic</strong></span>
            <br>
            <br>
            <p>
              C'est une personne à la fois d'une beauté éblouissante,
              d'une intelligence remarquable, dotée d'un charisme captivant,
              d'un charme incontestable, et d'une force exceptionnelle.
              Vraiment, il réunit toutes les qualités extraordinaires en une seule personne
            </p>
          </div>
        </div>
      </div>

      <div class="content2">
        <div class="case">
          <img src="../assets/robin.jpg" alt="Picture" class="elmir_img">
          <div class="prenom">
            <span class="nom">Robin <strong>Cassard</strong></span>
            <br>
            <br>
            <p>
              C'est une personne dont l'ego démesuré ne connaît aucune limite, un expert dans l'art de la tromperie
              qui ment systématiquement sans scrupules, et un maître de l'hypocrisie,
              capable de dissimuler ses véritables intentions derrière un masque de fausse vertu.
            </p>
          </div>
        </div>
      </div>

      <div class="content2">
        <div class="case">
          <img src="../assets/sefa2.jpg" alt="Picture" class="elmir_img">
          <div class="prenom">
            <span class="nom">Sefa <strong>Tas</strong></span>
            <br>
            <br>
            <p>
              C'est un individu déterminé, animé par une ambition inébranlable de devenir le roi des pirates, prêt à naviguer à travers les mers les plus dangereuses,
              à affronter des défis titanesques et à rassembler un équipage fidèle pour accomplir son rêve ultime.
            </p>
          </div>
        </div>
      </div>

      <div class="content2">
        <div class="case">
          <img src="../assets/noam.png" alt="Picture" class="elmir_img">
          <div class="prenom">
            <span class="nom">Noam <strong>Jolie-Girods</strong></span>
            <br>
            <br>
            <p>
              Il se voit comme Isagi, mais la réalité lui rappelle parfois que le talent brut et la persévérance du personnage
              de Blue Lock sont des qualités rares que tout le monde ne possède pas. Cependant, son enthousiasme
              et sa passion pour le football ne connaissent pas de limites, le poussant à poursuivre son rêve malgré les défis qui se dressent sur son chemin
            </p>
          </div>
        </div>
      </div>

      <div class="content2">
        <div class="case">
          <img src="../assets/thomas.jpg" alt="Picture" class="elmir_img">
          <div class="prenom">
            <span class="nom">Thomas <strong>Bouvais</strong></span>
            <br>
            <br>
            <p>
              Tel une ombre insaisissable, il demeure mystérieux et inscrutable. Son existence énigmatique fascine,
              car nul ne sait qui il est réellement, ni quelles sont ses véritables intentions.
              Une énigme vivante, toujours enveloppée de secrets insondables
            </p>
          </div>
        </div>
      </div>

    </div>

    <div class="contact">
      <h1 class="miam">Contact</h1>
      <hr>
      <div class="contact-container">
        <div class="left-section">
          <h1>Avez-vous des questions les bg?</h1>
          <label for="email" >Adresse mail:</label>
          <input type="email" id="email" class="email" v-model="email">

          <label for="message">Message:</label>
          <textarea id="message" class="message" v-model="message"></textarea>

          <button class="send-button">Envoyer</button>
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


  </div>
</template>

<style scoped>
body {
  background-color: #fcfcfc;
  font-family: 'Poppins', serif;
}

.txt {
  margin-top: 10%;
  margin-left: 13%;
}

.apropos {
  font-size: 20px;
  color: #464646;
  margin-left: 35%;
}

.apropos::after {
  content: "";
  display: block;
  align-items: center;
  width: 17%;
  height: 2px;
  background-color: #E30A17;
  margin-top: 0.5%;
}

.content {
  margin-top: 5%;
  display: flex;
}

.txt1_1 {
  width: 42%;
}

.picture {
  margin-left: 4%;
  width: 42%;
  border-radius: 25px
}

.equipe {
  margin-top: 6%;
  font-size: 20px;
  color: #464646;
  margin-left: 34%;
}

.equipe::after {
  content: "";
  display: block;
  align-items: center;
  width: 24%;
  height: 2px;
  background-color: #E30A17;
  margin-top: 0.5%;
}

.content2 {
  margin-top: 5%;
  display: flex;
}
.case {
  display: flex;
  height: 55%;
  width: 88%;
  background-color: #D9D9D9;
  padding: 50px;
  border-radius: 20px;
}

.elmir_img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 20px;
}

.nom{
  font-size: 40px;
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
  align-items: center;
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
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

#map {
  width: 600px;
  height: 400px;
  border: 2px solid #ccc;
  margin: 20px auto;
  border-radius: 10px;
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
  margin: 5px 0;
}

.contact-info img {
  width: 50px;
  margin-right: 10px;
}

.email{
  padding: 9px;
  border-radius: 10px;
}

.message{
  padding: 30px;
  border-radius: 10px;
}
</style>


<script>
import L from 'leaflet';

export default {
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
