<template>
    <div class="pourquoi">
        <h1>{{ $t('pourquoi') }}</h1>
        <hr>
        <div class="content-wrapper">
            <div class="content">
                <p class="text-left" v-html="$t('paragraph1')"></p>
                <img class="image-right" src="https://izmirtoantalya.com/fr/wp-content/uploads/sites/3/2022/01/cappadocia-turkey-travel-guide.jpg" alt="">
            </div>
            <div class="content">
                <img class="image-left" src="https://www.touraine-montgolfiere.fr/wp-content/uploads/2019/05/equipe-touraine-montgolfiere.jpg" alt="">
                <p class="text-right" v-html="$t('paragraph2')"></p>
            </div>
            <div class="content">
                <p class="text-left" v-html="$t('paragraph3')"></p>
                <img class="image-right" src="https://www.reservenaturellestbarth.com/upload/montgolfiere-cappadoce-1641815658-44454.jpg" alt="">
            </div>
        </div>
        <div class="bas">
            <img class="bas" src="../../assets/icons_pourquoi_nous_choisir.png" alt="">
        </div>
    </div>
</template>

<style scoped>
h1 {
    padding-top: 1%;
    text-align: center;
    font-family: 'Poppins', 'Arial';
    color: #333;
    margin-bottom: 0.5em; /* Réduire l'espace après le titre */
}
hr {
    display: block;
    width: 30%;
    margin: 0.5em auto; /* Marges verticales réduites */
    border-color: red;
    border-style: solid;
    border-width: 2px;
}
.pourquoi {
    padding-top: 5vh; /* Réduction de l'espace en haut */
    padding-bottom: 3%; /* Réduction de l'espace en bas */
    background-color: white;
    color: #1E1E1E;
}
.content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content {
    padding-top: 3%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: justify;
    width: 90%;
    margin-bottom: 1.5%; /* Réduction de l'espace entre les blocs */
}
.text-left, .text-right {
    text-align: justify;
    width: 48%;
    font-family: 'Poppins', 'Arial';
    padding: 0.5%; /* Paddings réduits */
    font-size: 1em; /* Taille de police standard */

}
.text-left {
    text-align: justify;

}
.text-right {
    text-align: justify;
}
.bas {
    width: 100%;
    margin-top: 2em; /* Espace réduit au-dessus de l'image du bas */
    margin-bottom: 1em;
}
.image-left, .image-right {
    width: 35%; /* Taille des images réduite */
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.15); /* Ombre portée plus légère */
}
.image-left {
    order: -1;
}
@media only screen and (max-width: 600px) {
    .content {
        flex-direction: column;
    }
    .text-left, .text-right {
        width: 100%;
        text-align: center;
    }
    .image-left, .image-right {
        width: 70%; /* Taille des images ajustée pour les petits écrans */
        order: 0;
    }
}
</style>