
<template>
  <div class="services">
    <h1>Météo à Cappadoce</h1>
    <hr>
    <MeteoActuelle />
    <PrevisionMeteo />
  </div>
</template>

<script>
import MeteoActuelle from '@/components/Meteo/MeteoActuelle.vue';
import PrevisionMeteo from '@/components/Meteo/PrevisionMeteo.vue';

export default {
  components: {
    MeteoActuelle,
    PrevisionMeteo
  }
}
</script>

<style scoped>
h1{
    text-align: center;

}
.services {
  padding-top: 10%;
  padding-bottom: 3%;

}

</style>
