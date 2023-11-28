<template>
  <transition :name="transition">
<div v-show="visible">
  <slot></slot>
</div>
  </transition>
</template>

<script>
export default {
  name: "CarouselSlide.vue",
  data () {
    return{
      index:0,
    }
  },
  computed: {
    transition() {
        return 'slide-' + this.$parent.direction;
    },
    visible() {
      return this.index === this.$parent.index;
    }
  }
}
</script>

<style scoped>
  .slide-right-enter-active {
    animation: slideRightIn .5s ease;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 70%;
  }

  .slide-right-leave-active {
    animation: slideRightOut .5s ease;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 70%;
  }

  @keyframes slideRightIn {
    from{
      transform: translateX(120%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideRightOut {
    from{
      transform: translateX(0);
    }
    to {
      transform: translateX(-120%);
    }
  }


  /* LEFT */
  .slide-left-enter-active {
    animation: slideLeftIn .5s ease;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 70%;
  }

  .slide-left-leave-active {
    animation: slideLeftOut .5s ease;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 70%;
  }

  @keyframes slideLeftIn {
    from{
      transform: translateX(-120%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideLeftOut {
    from{
      transform: translateX(0);
    }
    to {
      transform: translateX(120%);
    }
  }

  @media only screen
  and (max-width : 530px) {
    .slide-right-enter-active {
      top: 20%;
    }

    .slide-right-leave-active {
      top: 20%;
    }

    /* LEFT */
    .slide-left-enter-active {
      top: 20%;
    }

    .slide-left-leave-active {
      top: 20%;
    }
  }
</style>