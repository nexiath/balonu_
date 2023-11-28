<template>
  <div class="galerie">
    <h1>GALERIE</h1>
    <hr>
    <div class="gallery-container">
    <button @click="prevImage" class="arrow left-arrow">←</button>
    <div class="images">
      <img v-for="(image, index) in displayedImages" :key="index" :src="image" alt="Gallery Image" class="gallery-image">
    </div>
    <button @click="nextImage" class="arrow right-arrow">→</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://i.pinimg.com/564x/78/f0/46/78f04610a5f385ba4fac7d89d554096f.jpg',
        'https://i.pinimg.com/564x/48/30/90/4830907e5a8255902241d3631809c05d.jpg',
        'https://i.pinimg.com/564x/8e/e5/98/8ee5983c34abcfa3cd9985913fff556b.jpg',
        'https://i.pinimg.com/564x/f8/bc/93/f8bc9364c7f0c56ab5b8f7b373529fc6.jpg',
        'https://i.pinimg.com/564x/77/22/79/772279c4a5e171ba2c5c67d8b907db78.jpg',
        'https://i.pinimg.com/564x/40/ee/76/40ee76563d9264b56fa8399d5ea45714.jpg'
      ],
      startIndex: 0
    };
  },
  computed: {
    displayedImages() {
      return [
        this.images[this.startIndex % this.images.length],
        this.images[(this.startIndex + 1) % this.images.length],
        this.images[(this.startIndex + 2) % this.images.length]
      ];
    }
  },
  methods: {
    nextImage() {
      this.startIndex = (this.startIndex + 1) % this.images.length;
    },
    prevImage() {
      this.startIndex = (this.startIndex - 1 + this.images.length) % this.images.length;
    }
  }
};

</script>

<style scoped>
.galerie{
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

.gallery-container {
  padding-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.images {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image {
  width: 300px;  /* Ajustez la taille selon vos besoins */
  height: 300px; /* Ajustez la taille selon vos besoins */
  margin: 0 60px;
  border-radius: 10px;
}

.arrow {
  background: none;
  border: 100vh;
  font-size: 2rem;
  cursor: pointer;
}
</style>