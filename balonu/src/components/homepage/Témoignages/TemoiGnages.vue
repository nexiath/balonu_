<!--
<template>
  <div class="testimonial-section">
    <h1>TÉMOIGNAGES</h1>
    <hr>
    <div class="testimonial-container">
      <div v-for="(testimonial, index) in filteredTestimonials" :key="index" class="testimonial" :class="{ 'slide-in': index === currentTestimonial }">
        <div class="profile">
          <img :src="testimonial.image" alt="Profile Picture" class="profile-pic">
          <div class="details">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.email }}</p>
          </div>
        </div>
        <p class="message">{{ testimonial.message }}</p>
      </div>
      <button @click="prevTestimonial" class="arrow left-arrow">←</button>
      <button @click="nextTestimonial" class="arrow right-arrow">→</button>
    </div>
  </div>
  </template>
  -->
  <template>
    <carousel>
      <h3>Témoignages</h3>
      <hr>
      <carousel-slide class="carousel_slide" v-for="n in slides" :key="n">
        <img src="../../../../src/assets/icon_double_quote_serif_left.png" alt="" class="quote-icon">
        <div class="presentation">
        <img :src="testimonials[n].image" alt="">
          <div class="infos">
            <span class="name">{{ testimonials[n].name }}</span>
            <span class="email">{{ testimonials[n].email }}</span>
          </div>
        </div>
        <p class="mobile">{{ testimonials[n].messageMobile }}</p>
        <p class="desktop">{{ testimonials[n].message }}</p>
        <img src="../../../../src/assets/icon_double_quote_serif_left.png" alt="" class="quote-icon" style="transform: rotate(180deg); margin-left: auto">

      </carousel-slide>

    </carousel>
  </template>


<script>

import Carousel from './carousel/CarouSel';
import CarouselSlide from "./carousel/CarouselSlide";

  export default {
    components: {
      Carousel,
      CarouselSlide,
    },
  data() {
    return {
      slides: 4,
      testimonials: [
        {
          image: 'https://thispersondoesnotexist.com/',
          name: 'Aisha Patel',
          email: 'benevole@balonu.com',
          message: '"J\'ai offert à ma femme un vol en montgolfière avec Balonu pour notre anniversaire de mariage, et je ne pouvais pas espérer mieux. Non seulement le paysage était à couper le souffle, mais l\'équipe a rendu notre expérience spéciale et mémorable. Ils ont même organisé une petite surprise pour nous à la fin du vol ! Un moment que nous n\'oublierons jamais."',
          messageMobile: '"J\'ai offert à ma femme un vol en montgolfière avec Balonu pour notre anniversaire de mariage, et je ne pouvais pas espérer mieux..."'
        },
        {
          image: 'https://cdn.discordapp.com/attachments/1174355753654550568/1181578559366627338/telechargement_3.jpg?ex=658191c9&is=656f1cc9&hm=5fbd88c3dc045f99cf3728c019607083803e7e1fe479bc3f17509f489579e0b1&',
          name: 'Lucia Bianchi',
          email: 'benevole@balonu.com',
          message: '"En tant que photographe, j\'ai toujours voulu capturer la beauté de la Cappadoce d\'en haut. Balonu m\'a offert cette chance. L\'équipe a été très arrangeante, me permettant de prendre des photos sous différents angles. Le résultat ? Des clichés absolument époustouflants que je suis fier d\'ajouter à mon portfolio. Je recommande vivement cette expérience à tous les passionnés de photographie."',
          messageMobile: '"En tant que photographe, j\'ai toujours voulu capturer la beauté de la Cappadoce d\'en haut. Balonu m\'a offert cette chance..."'
        },
        {
          image: 'https://cdn.discordapp.com/attachments/1174355753654550568/1176443404247375963/telechargement_3.jpg?ex=656ee34c&is=655c6e4c&hm=1d86fe591bef0ff8de9654bcb3d888188aa6dd6fd1cf2b7ff17e379ba1fe0161&',
          name: 'Alexei Ivanov',
          email: 'benevole@balonu.com',
          message: '"J\'avais une peur bleue de monter en montgolfière, mais ma compagne a insisté pour que nous tentions l\'aventure avec Balonu. Je suis si heureux de l\'avoir écoutée. L\'équipe de Balonu a été rassurante et professionnelle, me mettant à l\'aise dès le début. Une fois dans les airs, mes peurs se sont envolées, remplacées par un émerveillement pur. Une expérience que je suis prêt à refaire !"',
          messageMobile: '"J\'avais une peur bleue de monter en montgolfière, mais ma compagne a insisté pour que nous tentions l\'aventure avec Balonu..."'
        },
        {
          image: 'https://cdn.discordapp.com/attachments/1174355753654550568/1176442739802509423/telechargement.jpg?ex=656ee2ae&is=655c6dae&hm=383ba6ee41b07bd666bdf4facb559095846dc3445dcb9b0ecbe7d3510bbd4e56&',
          name: 'Yuki Takahashi',
          email: 'benevole@balonu.com',
          message: '"J\'ai voyagé dans de nombreux endroits et vécu de nombreuses aventures, mais mon vol avec Balonu reste en tête de liste. L\'équipe connaît vraiment son métier et la région de la Cappadoce. Ils ont partagé des anecdotes et des faits fascinants tout au long du vol, rendant l\'expérience encore plus enrichissante. C\'était à la fois éducatif et absolument magnifique."',
          messageMobile: '"J\'ai voyagé dans de nombreux endroits et vécu de nombreuses aventures, mais mon vol avec Balonu reste en tête de liste..."'
        },
        {
          image: 'https://cdn.discordapp.com/attachments/1174355753654550568/1176443598116491264/telechargement_5.jpg?ex=656ee37b&is=655c6e7b&hm=e43cd7553a219b2453d85bd9910ba7be8c1badc4b8ae8f42f2c4360ff8098528&',
          name: 'Carlos Rivera',
          email: 'benevole@balonu.com',
          message: '"Mon vol en montgolfière avec Balonu a été le point culminant de mon voyage en Turquie. Rien ne peut décrire la sensation de flotter paisiblement au-dessus de ces paysages majestueux. L\'équipe était chaleureuse, amicale et extrêmement compétente. Je me suis senti en sécurité du début à la fin. Si vous êtes en Cappadoce, ne manquez pas cette expérience !"',
          messageMobile: '"Mon vol en montgolfière avec Balonu a été le point culminant de mon voyage en Turquie. Rien ne peut décrire la sensation de flotter paisiblement au-dessus de ces paysages majestueux..."'
        }
      ],

    };
  },
  mounted() {

  },
  computed: {

  }

};
</script>

<style>
p.mobile {
  display: none;
}

/* Ajoute du style personnalisé ici */
.carousel {
  position: relative;
  overflow: hidden;
  background-color: #1E1E1E;
  height: 100vh;
}

.carousel h3 {
  color: #fff;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-top: 2em;
}

.carousel_nav {
  position: absolute;
  top: 50%;
  height: 35px;
  width: 18px;
  cursor: pointer;
}

.carousel_prev {
  left: 20px;
}

.carousel_next {
  right: 20px;
}

.carousel_pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.carousel_pagination > button {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #000;
  opacity: 0.8;
  border-radius: 10px;
  margin: 0 2px;
  border: 0;
}

.carousel_pagination > button.active {
  background-color: #fff;
}

hr {
  display: block;
  width: 20%;
  margin: 0.5% auto 0 auto;
  border-color: red;
  border-style: solid;
  border-width: 1px;
}

.carousel_slide {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 70%;
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  justify-content: space-around;
  margin: 0 auto;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 3em;
  padding-bottom: 3em;
  -webkit-box-shadow: 5px 5px 14px 0px rgba(0,0,0,0.58);
  box-shadow: 5px 5px 14px 0px rgba(0,0,0,0.58);
}

.carousel_slide img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

div.presentation img {
  margin-right: 1em;
  border: 2px solid #1E1E1E;
}

div.presentation {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

div.infos {
  color: #E30A17;
  display: flex;
  flex-direction: column;
}

img.quote-icon {
  border-radius: 0;
  height: 45px;
  width: 60px;
}

img.quote-icon:first-child {
  margin-bottom: 1em;
}

img.quote-icon:last-child {
  margin-top: 1em;
}

div.presentation, .carousel p {
  padding-left: 3em;
  padding-right: 3em;
}

div.infos span.name {
  font-weight: bold;
}

@media only screen
and (max-width : 1000px) {
  #temoignages > div > div:nth-child(3) > div > div > span.name {
    max-width: 100%;
    width: 100%;
  }
}

@media only screen
and (max-width : 900px) {
  .carousel_slide {
    height: 500px;
  }
}

@media only screen
and (max-width : 785px) {
  .carousel_slide {
    height: 530px;
    padding-left: 2em;
    padding-right: 2em;
  }
}

@media only screen
and (max-width : 600px) {
  .carousel {
    height: 110vh;
  }
  .carousel_slide {
    height: 600px;
    padding-left: 2em;
    padding-right: 2em;
  }

  div.presentation {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  div.presentation img {
    margin: 0;
  }

  div.infos {
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  #temoignages > div > div:nth-child(3) > div > div > span.email {
    text-align: center;
    width: 100%;
  }

  #temoignages > div > div:nth-child(3) > div > div > span.name {
    text-align: center;
    width: 100%  !important;
  }

  p.mobile {
    display: block;
  }

  p.desktop {
    display: none;
  }
}

@media only screen
and (max-width : 530px) {
  .carousel {
    height: 110vh;
  }
  .carousel_slide {
    height: 600px;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 2em;
    padding-bottom: 2em;
    top: 20%;
  }


  #temoignages > div > div:nth-child(3) > div > div > span.email {
    text-align: center;
    width: 100%;
  }

  #temoignages > div > div:nth-child(3) > div > div > span.name {
    text-align: center;
    width: 100%  !important;
  }
}

</style>
