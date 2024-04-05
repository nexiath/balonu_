<template>
  <div class="carousel">
    <slot></slot>
    <img src="../../../../../src/assets/testimony_review_arrow_icon.png" alt="Flèche de droite" class="carousel_nav carousel_next" @click.prevent="next" style="transform: rotate(180deg)">
    <img src="../../../../../src/assets/testimony_review_arrow_icon.png" alt="Flèche de gauche" class="carousel_nav carousel_prev" @click.prevent="prev">
    <div class="carousel_pagination">
      <button v-for="n in slidesCount" :key="n" @click="goTo(n-1)" :class="{active: n-1 == index }"></button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    console.log(this.$children)
    return {
      index: 0,
      slides: [],
      direction: null
    }
  },
  computed: {
    slidesCount() {
      return this.slides.length
    }
  },
  mounted() {
    this.slides = this.$children;
    this.slides.forEach((slide, i) => {
      slide.index = i;
    })
  },
  methods: {
    next () {
      this.index++;
      this.direction = 'right';
      if(this.index >= this.slidesCount) {
        this.index = 0;
      }
    },
    prev () {
      this.index--;
      this.direction = 'left';
      if (this.index < 0) {
        this.index = this.slidesCount-1;
      }
    },
    goTo (index) {
      this.direction = index > this.index ? 'right' : 'left'
      this.index = index;
    }
  }
}
</script>
