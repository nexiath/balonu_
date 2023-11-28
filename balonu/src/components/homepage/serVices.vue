<template>
    <div class="services">
        <h1>NOS SERVICES SUR PLACE</h1>
        <hr>
        <div class="card-container">
            <div class="card">
                <router-link to="/restauration">
                    <div style="background-image: url('https://resize.prod.femina.ladmedia.fr/rblr/1200,806/img/var/2023-07/hot-dog-ikea.jpg');"
                        class="card-image"></div>
                    <div class="card-text">Restauration</div>
                </router-link>
            </div>
            <div class="card">
                <router-link to="/barbecues">
                    <div style="background-image: url('https://alaloupe.be/wp-content/uploads/barbecue-conseil-et-astuces.jpg');"
                        class="card-image"></div>
                    <div class="card-text">Barbecue</div>
                </router-link>
            </div>
            <div class="card">
                <router-link to="/boutique">
                    <div style="background-image: url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym91dGlxdWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80');"
                        class="card-image"></div>
                    <div class="card-text">Boutique</div>
                </router-link>
            </div>
        </div>
            <router-link to="/map">
                <button class="carte-button">Voir la carte</button>
            </router-link>
    </div>
</template>

<script>

</script>

<style scoped>
.services {
    padding-top: 4%;
    padding-bottom: 3%;
    background-color: #1E1E1E;
    color: white;
}

h1 {
    text-align: center;
    font-family: 'Poppins', 'Arial';
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
    padding-top: 6%;
    display: flex;
    justify-content: center;
    /* Centrer les cartes horizontalement */
    gap: 40px;
    padding-bottom: 5%;
    flex-wrap: wrap;
}

.card {
    width: 350px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    font-family: 'Poppins', 'Arial';
}

.card:hover {
    transform: scale(1.05);
}

.card-image {
    width: 350px;
    height: 280px;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.card-text {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: red;
    font-size: 20px;
    color: white;
    text-align: center;
    padding: 10px 0;
    /* Ajustez le padding ici */
    opacity: 1;
    border-bottom-left-radius: 10px;
    /* Arrondi pour le bas gauche */
    border-bottom-right-radius: 10px;
    /* Arrondi pour le bas droit */
}

.carte-button > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carte-button {
    background-color: red;
    color: white;
    justify-content: center;
    border: 0.5px solid black;
    padding: 4px 32px;
    font-family: 'Poppins', serif;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.carte-button:hover {
    transform: scale(0.95);
    box-shadow: 0px 2px 4px rgba(34, 34, 34, 0.2);
}

@media only screen
and (max-width : 600px) {

  h1 {
    max-width: 80%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
  }

}
</style>
