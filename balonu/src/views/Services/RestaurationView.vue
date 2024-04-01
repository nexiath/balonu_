<template>
  <div id="root">
      <RestaurationHeader />
    <div id="app">
      <StandsView/>
    </div>
  </div>
</template>

<script>
import RestaurationHeader from "@/components/Services/Restauration/RestaurationHeader.vue";
import StandsView from "@/components/Services/Restauration/StandsRestaurationView.vue";

export default {
  name: 'RestaurationView',
  components: {
    RestaurationHeader,
    StandsView
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

#top, #pq {
  margin: 0;
  padding: 0;
}

</style>
