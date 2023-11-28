<template>
    <div class="error-page">
        <div class="error-message">
        <h1>Erreur d'URL</h1>
        <p>La page que vous recherchez n'existe pas.</p>
      </div>
      <div class="sun"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="hot-air-balloon">
        <div class="balloon"><span></span></div>
        <div class="basket"></div>
      </div>
      
    </div>
</template>
  
<style scoped>

/* Styles généraux */

.error-message {
    text-align: center;
    color: var(--text-color);
    font-family: 'Comic Sans MS', cursive, sans-serif; /* Police ludique pour le thème montgolfière */
}

.error-message h1 {
    font-size: 2.5em;
    color: var(--primary-color);
    text-shadow: 1px 1px 2px var(--accent-color); /* Ombre pour donner du relief */
}

.error-message p {
    font-size: 1.4em;
    margin-top: 20px;
}

/* Ajout d'éléments décoratifs */
.error-message::before {
    content: '';
    display: block;
    width: 150px;
    height: 100px;
   
    background-size: contain;
    margin: 20px auto;
}

/* Couleurs */
:root {
    --primary-color: #f48fb1; /* Couleur principale */
    --accent-color: #d7608d; /* Couleur secondaire */
    --background-color: #f7e1f2; /* Couleur de fond */
    --text-color: #333; /* Couleur du texte */
    --font-family: 'Arial', sans-serif; /* Police de caractère */
}

/* Styles généraux */
.error-page {
    padding-top: 5%;
    font-family: var(--font-family);
    color: var(--text-color);
}

body {
    background: var(--background-color);
}
/* Soleil */
.sun {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: #fbcce3;
    position: absolute;
    left: 50%;
    margin-left: -110px;
    margin-top: 80px;
    margin-bottom: 80px;
}

/* Nuages */
.cloud {
    background: #ffffff;
    width: 100px;
    height: 35px;
    border-radius: 35px;
    position: absolute;
    left: 50%;
    margin-left: -170px;
    margin-top: 200px;
    box-shadow: 0 3px 5px rgba(251, 113, 163, 0.4);
    animation: cloud infinite 3s;

    &:before {
        content: "";
        height: 40px;
        width: 40px;
        background: #ffffff;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 50%;
    }

    &:after {
        content: "";
        height: 60px;
        width: 60px;
        background: #ffffff;
        position: absolute;
        bottom: 5px;
        right: 15%;
        border-radius: 50%;
    }

    &:nth-child(2) {
        width: 80px;
        margin-left: 70px;
        margin-top: 190px;
        animation-delay: -1s;

        &:before {
            left: auto;
            right: 0;
        }

        &:after {
            width: 50px;
            height: 50px;
            right: auto;
            left: 10%;
        }
    }
}

/* Montgolfière */
.hot-air-balloon {
    position: absolute;
    left: 50%;
    margin-top: 250px;
    margin-left: -10px;
    animation: balloon infinite 3s 0.5s;
}

/* Nacelle de la montgolfière */
.balloon {
    width: 70px;
    height: 12px;
    background: #d7608d;
    border: 3px solid #b33e64;
    border-radius: 3px;
    position: absolute;
    top: -42px;
    left: 50%;
    margin-left: -35px;

    &:before {
        content: "";
        background: #d7608d;
        width: 140px;
        height: 160px;
        position: absolute;
        bottom: 26px;
        left: 50%;
        margin-left: -73px;
        border-radius: 50%;
        border: 3px solid #b33e64;
    }

    &:after {
        content: "";
        background: #d7608d;
        width: 80px;
        height: 49px;
        position: absolute;
        bottom: 4px;
        left: 50%;
        margin-left: -43px;
        transform: perspective(70px) rotateX(-40deg);
        border: 3px solid #b33e64;
        border-top: 0;
    }

    span {
        display: block;
        width: 84px;
        height: 174px;
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        bottom: 12px;
        z-index: 2;
        border: 3px solid #b33e64;
        left: 50%;
        margin-left: -45px;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);

        &:after {
            content: "";
            display: block;
            width: 28px;
            height: 174px;
            background: #d7608d;
            border-radius: 50%;
            position: absolute;
            bottom: -3px;
            z-index: 2;
            border: 3px solid #b33e64;
            left: 50%;
            margin-left: -17px;
        }
    }
}

/* Panier de la montgolfière */
.basket {
    width: 20px;
    height: 20px;
    background: #d1c1a5;
    border: 3px solid #b33e64;
    border-radius: 3px;
    position: relative;
    box-shadow: 0 2px 4px rgba(179, 62, 100, 0.6);

    &:before {
        content: "";
        width: 30px;
        height: 6px;
        background: #d1c1a5;
        position: absolute;
        top: -12px;
        left: -8px;
        border: 3px solid #b33e64;
        border-radius: 3px;
    }

    &:after {
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        top: -30px;
        left: -2px;
        transform: perspective(50px) rotateX(-40deg);
        border: 2px solid #b33e64;
    }
}

/* Animation des nuages */
@keyframes cloud {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

/* Animation de la montgolfière */
@keyframes balloon {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}


</style>
