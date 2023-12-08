<template>
  <div id="app">
    <main>
      <article id="hero-1" style="--i: 5">
        <div class="hero-info">
          <h2>Sentez la</h2>
          <h1>Brise</h1>
          <h3>Voyagez au-delà des rêves</h3>
        </div>
        <div class="hero-image hi-1"></div>
      </article>

      <article id="hero-2" style="--i: 4">
        <div class="hero-info">
          <h2>Parcourez le</h2>
          <h1>Ciel</h1>
          <h3>Lever du soleil doré sur Göreme</h3>
        </div>
        <div class="hero-image hi-2"></div>
      </article>

      <article id="hero-3" style="--i: 3">
        <div class="hero-info">
          <h2>Embrassez la</h2>
          <h1>Magie</h1>
          <h3>Les vallées s'étendent à perte de vue</h3>
        </div>
        <div class="hero-image hi-3"></div>
      </article>

      <article id="hero-4" style="--i: 2">
        <div class="hero-info">
          <h2>Écoutez le</h2>
          <h1>Silence</h1>
          <h3>La nature parle à Uçhisar</h3>
        </div>
        <div class="hero-image hi-4"></div>
      </article>

      <article id="hero-5" style="--i: 1">
        <div class="hero-info">
          <h2>Perdez-vous dans</h2>
          <h1>L'immensité</h1>
          <h3>Les ombres des montgolfières à Avanos</h3>
        </div>
        <div class="hero-image hi-5"></div>
      </article>
    </main>
  </div>
</template>


<script>
import gsap from "gsap";

export default {
  data() {
    return {
      i: 1,
      tl: null
    };
  },
  mounted() {
    this.tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "expo.out"
    });

    gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    });

    gsap.set(
        [
          `#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2,
         #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1,
         #hero-2 h3, #hero-3 h3, #hero-4 h3, #hero-5 h3`
        ],
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
        }
    );

    while (this.i < 5) {
      this.tl.to(`#hero-${this.i} h2`, 0.9, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        delay: 5
      })
          .to(`#hero-${this.i} h1`, 0.9, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          }, "-=0.3")
          .to(`#hero-${this.i} h3`, 0.9, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          }, "-=0.3")
          .to(`#hero-${this.i} .hi-${this.i}`, 0.7, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          }, "-=1")
          .to(`#hero-${this.i + 1} h2`, 0.9, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          })
          .to(`#hero-${this.i + 1} h1`, 0.9, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }, "-=0.3")
          .to(`#hero-${this.i + 1} h3`, 0.9, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }, "-=0.3");

      this.i++;
    }
  }
};
</script>
  
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&display=swap");

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html, body {
    overflow-x: hidden; /* Cela cache le débordement horizontal */
    max-width: 100%;   /* Assurez-vous que la largeur maximale est 100% */
  }

  body {
    font-family: "Poppins", sans-serif;

    --black: #242424;
    --white: #f5f5f5;
    --pill: #e0d4be;
    --red: #cc033f;
  }

  ul {
    list-style: none;
  }

  .page-wrap {
    position: relative;
  }

  header {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  main {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  article {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--i);
  }

  .hero-info {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    z-index: 8;
  }
  .hero-info h2 {
    font-size: clamp(2rem, 9vw, 5rem);
    line-height: clamp(2rem, 9vw, 5rem);
    text-transform: uppercase;
  }
  .hero-info h1 {
    color: var(--white);
    font-size: clamp(3.2rem, 10vw, 7rem);
    line-height: clamp(3.2rem, 10vw, 7rem);
    text-transform: uppercase;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  }
  .hero-info h3 {
    color: var(--white);
    font-size: 1.6rem;
    font-weight: normal;
    margin-top: 2em;
  }
  @supports (-webkit-text-stroke: 3px var(--pill)) {
    .hero-info h2 {
      color: transparent;
      -webkit-text-stroke: 3px var(--pill);
      text-shadow: none;
    }
  }

  .hero-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .hi-1 {
    background-image: url("https://images.pexels.com/photos/3889704/pexels-photo-3889704.jpeg?cs=srgb&dl=pexels-taryn-elliott-3889704.jpg&fm=jpg");
  }

  .hi-2 {
    background-image: url("https://wallpapercave.com/wp/wp3933604.jpg");
  }

  .hi-3 {
    background-image: url("https://rare-gallery.com/uploads/posts/897164-landscape-nature-hot-air-balloons-Cappadocia-Turkey.jpg");
  }


  .hi-4 {
    background-image: url("https://wallpapercave.com/wp/wp3933596.jpg");
  }


  .hi-5 {
    background-image: url("https://wallpapercave.com/wp/wp3933609.jpg");
  }

  /*  SECTION: Overlay Menu Section
  ----------------------------------------------- */
  section {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    min-height: 100vh;
    padding: 8em 5em 2em 5em;
    background-color: var(--white);
    background-image: url("https://www.transparenttextures.com/patterns/church.png");
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  }

  .level-1 {
    display: grid;
    grid-template-columns: 65% 1fr;
    grid-auto-rows: min-content;
    grid-gap: 2em;
  }
  .level-1 h3 {
    font-weight: 600;
    font-size: 1.8rem;
    text-transform: uppercase;
  }
  .level-1 p {
    margin: 0.5em 0 0 0.5em;
  }
  .level-1 p small {
    font-size: 1rem;
    opacity: 0.5;
    cursor: pointer;
  }
  .level-1 p small:hover {
    opacity: 1;
    color: var(--red);
  }
  .level-1 ul > li {
    font-size: 1.2rem;
    padding: 0.3em;
    transition: color 0.3s;
  }
  .level-1 ul > li:hover {
    color: var(--red);
    cursor: pointer;
  }
  .level-1 li:nth-of-type(1) {
    grid-column: 1/2;
    grid-row: 1/4;
  }
  .level-1 li:nth-of-type(2) {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  .level-1 li:nth-of-type(3) {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .level-1 li:nth-of-type(4) {
    grid-column: 2/3;
    grid-row: 3/4;
  }

  .level-2 {
    padding: 0.3em 1em;
  }
  .level-2 li p {
    color: var(--red);
    font-size: 1.3rem;
    font-weight: 600;
    margin: 1em 0;
    text-transform: uppercase;
    border-bottom: 1px solid #fde0ac;
  }

  .level-3 {
    display: flex;
    flex-wrap: wrap;
  }
  .level-3 li {
    padding: 0.5em 1em !important;
    background-color: var(--pill);
    border-radius: 500px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 1rem !important;
    cursor: pointer;
    color: var(--black);
  }

  @media screen and (max-width: 600px) {
    nav {
      padding: 1em 2em;
    }
    nav h1 {
      font-size: 0.9rem;
    }
    section {
      padding: 8em 2em 2em 2em;
    }
    .level-1 {
      grid-template-columns: 1fr;
    }
    .level-1 li:nth-of-type(1) {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    .level-1 li:nth-of-type(2) {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    .level-1 li:nth-of-type(3) {
      grid-column: 1/2;
      grid-row: 3/4;
    }
    .level-1 li:nth-of-type(4) {
      grid-column: 1/2;
      grid-row: 4/5;
    }
  }
  </style>
  
