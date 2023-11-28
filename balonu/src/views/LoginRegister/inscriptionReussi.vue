<template>
    <div class="success-page">
      <div class="success-message">
        <h1 class="success-title">Inscription réussie</h1>
        <p class="success-description">Un administrateur traitera votre demande dans les plus brefs délais.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuccessPage',
  };
  </script>
  
  <style scoped>
  .success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2ecc71; /* Couleur de fond verte pour une ambiance positive */
    overflow: hidden; /* Empêche les éléments en dehors de la page de s'afficher */
  }
  
  .success-message {
    text-align: center;
    color: white; /* Couleur du texte en blanc pour le contraste */
    font-family: 'Arial', sans-serif;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1); /* Arrière-plan semi-transparent */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Ombre légère */
    animation: explode 1s ease-in-out; /* Animation d'explosion */
  }
  
  .success-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .success-description {
    font-size: 1.2rem;
  }
  
  @keyframes explode {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>
  