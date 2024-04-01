<template>
  <div id="root">
    <BoutiqueHeader />
    <div id="app">
      <StandsView/>
    </div>
  </div>
</template>

<script>
import BoutiqueHeader from "@/components/Services/Boutique/BoutiqueHeader.vue";
import StandsView from "@/components/Services/Boutique/StandsBoutiqueView.vue";
export default {
  name: 'BoutiqueView',
  components: {
    BoutiqueHeader,
      StandsView,
  },
  data() {
    return {
      cartItems: []
    };
  },
}
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
}

#top,
#pq {
  margin: 0;
  padding: 0;
}
</style>
