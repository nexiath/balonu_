<template>
  <div id="root" class="homepage" ref="homepage">
    <div id="top">
      <TopView />
    </div>
    <div id="pq">
      <PourquoiChoix />
    </div>
    <div id="serv">
      <serVices />
    </div>
    <div id="reserve">
      <!-- <ReserveVol /> -->
      <PrestaVue/>
    </div>
    <div id="temoignages">
      <Temoignages />
    </div>
    <div id="Galerie">
      <Galerie />
    </div>
    <div id="Contact">
      <Contact />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
import TopView from '@/components/homepage/TopView.vue'
import PourquoiChoix from '@/components/homepage/PourquoiChoix.vue'
import serVices from '@/components/homepage/serVices.vue'
// import ReserveVol from '@/components/homepage/ReserveVol.vue'
import PrestaVue from '@/components/homepage/PrestaVue.vue'
import Temoignages from '@/components/homepage/Témoignages/TemoiGnages.vue'
import Galerie from '@/components/homepage/GaleRie.vue'
import Contact from '@/components/homepage/ConTact.vue'

export default {
  name: 'HomeView',
  components: {
    TopView,
    PourquoiChoix,
    serVices,
    // ReserveVol,
    PrestaVue,
    Temoignages,
    Galerie,
    Contact
  },

computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
}
}
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
}

#top, #pq {
  margin: 0;
  padding: 0;
}
</style>
