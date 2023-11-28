import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css';
import VueI18n from 'vue-i18n'
import messages from '@/store/translations'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown, faGlobe, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

// Ajout des icônes à la bibliothèque FontAwesome
library.add(faCaretDown, faGlobe, faChevronLeft, faChevronRight)

// Enregistrement du composant FontAwesome
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// Configuration de VueI18n
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages
})

// Désactivation du tip de production
Vue.config.productionTip = false

// Création de l'instance de Vue
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // Initialisation de l'état d'authentification
    this.$store.dispatch('auth/initializeAuthState');
  }
}).$mount('#app')


