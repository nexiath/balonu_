<template>
  <div class="addmap">
    <SimulationMap />
  </div>
</template>

<script>

import SimulationMap from '@/components/Map/AddMapAdmin.vue';

export default {
  name: 'App',
  components: {
    SimulationMap,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


div.container > div {
  width: 50%;
}


.addmap {
  margin-top: 10em;

  z-index: 9999999999999999999999999999999999999999 !important;
}
</style>