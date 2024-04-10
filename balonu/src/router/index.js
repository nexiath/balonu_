import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AProposView from '../views/AProposView.vue'
import Login from '../views/LoginRegister/LoginView.vue'
import RegisterLogin from "@/views/LoginRegister/RegisterLogin.vue";
import RestaurationView from "@/views/Services/RestaurationView.vue";
import BarbecueView from "@/views/Services/BarbecueView.vue";
import SerVices from "@/views/ServicesView.vue";
import FaqView from "@/views/FaqView";
import checkout from "@/views/Services/CheckoutView.vue";
import MapView from "@/views/Map/MapView.vue";
import Meteo from "@/views/Meteo/MeteoView.vue";
import BilleTerie from "@/views/BilleterieView.vue";
import MongolfierePrestataire from "@/views/PrestataireView.vue";
import BoutiqueView from "@/views/Services/BoutiqueView.vue";
import store from "../store/index"
import AddMapView from "@/views/Map/AddMapView.vue";
import ListeOr from "../views/ListOrView.vue";
import StatistiquesView from "@/views/StatistiquesView.vue";

import { isLivreDOrActivated,isMontgolfieresActivated,isStandsActivated } from '@/services/presta.service';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/statistiques',
    name: 'StatistiquesView',
    component: StatistiquesView
  },
  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/apropos',
    name: 'apropos',
    component: AProposView
  },
  {
    path: '/boutique',
    name: 'boutique',
    component: BoutiqueView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterLogin
  },
  {
    path: '/restauration',
    name: 'restauration',
    component: RestaurationView
  },
  {
    path: '/barbecues',
    name: 'barbecues',
    component: BarbecueView
  },
  {
    path: '/services',
    name: 'SerVices',
    component: SerVices
  },
  {
    path: '/faq',
    name: 'FaqView',
    component: FaqView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
    props: (route) => ({ items: route.params.items }),

  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView
  },
  {
    path: '/addmap',
    name: 'addmap',
    component: AddMapView
  },
  {
    path: '/meteo',
    name: 'Meteo',
    component: Meteo
  },
  {
    path: '/billeterie',
    name: 'BilleTerie',
    component: BilleTerie
  },
  {
    path: '/prestataire/:id',
    name: 'MongolfierePrestataire',
    component: MongolfierePrestataire
  },
  {
    path: '/ajoutstand',
    name: 'ajoutstand',
    component: () => import(/* webpackChunkName: "about" */ '../components/Services/Stands/AjoutStand.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];
      if (isAuthenticated && userIdRole === 1) {
        next(); 
      } else {
        next({ path: '/services/stands/:id' }); 
      }
    }
  },
  {
    path: '/stands',
    name: 'stands',
    component: () => import(/* webpackChunkName: "about" */ '../components/Services/Stands/StandsView.vue'),
    beforeEnter: (to, from, next) => {
      // Accédez aux getters du store
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];

      // Vérifiez si l'utilisateur est authentifié et que son idRole est 2
      if (isAuthenticated && userIdRole === 1) {
        next(); // Si l'utilisateur est autorisé, continuez
      } else {
        next({ path: '/' });
      }
    }
  },
  {
    path: '/services/stands/:id',
    name: 'standsPresta',
    component: () => import( '../components/Services/Stands/StandsPrestaView.vue'),
    beforeEnter: async (to, from, next) => {
      const prestataireId = to.params.id;
      const isActivated = await isStandsActivated(prestataireId);
      if (isActivated ) {
        next();
      } else {
        alert('Ce service est désactivé');
      }
    },
  },
  {
    path: '/ajoutproduits/:id_stand',
    name: 'ajoutproduits',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../components/Services/AjoutProduits.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];

      if (isAuthenticated && userIdRole === 1) {
        next();
      } else {
        next({ path: '/restauration' });
      }
    }
  },

  // {
  //   path: '/passlist',
  //   name: 'passlist',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/passes/PassList.vue')
  // },

  {
    path: '/stand/:id',
    name: 'Stand',
    component: () => import(/* webpackChunkName: "stand" */ '../views/Services/ProduitsView.vue'),
    props: true,
  },
  {
    path: '/presta/:id',
    name: 'PagePresta',
    component: () => import(/* webpackChunkName: "stand" */ '../views/PagePrestataireView.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];
      if (isAuthenticated && userIdRole === 3) {
        alert('L\'organisteur n\'est pas autorisé à aller sur cette page ');
      } else {
        next(); 
      }
    }
  },
  {
    path: '/prestaOrga/:id',
    name: 'PagePrestaOrga',
    component: () => import(/* webpackChunkName: "stand" */ '../views/PagePrestataireOrgaView.vue'),
  },
  {
    path: '/services/commentaires/:id',
    name: 'commentaires',
    component: ListeOr,
    beforeEnter: async (to, from, next) => {
      const prestataireId = to.params.id;
      const isActivated = await isLivreDOrActivated(prestataireId);
      if (isActivated ) {
        next();
      } else {
        alert('Ce service est désactivé');
      }
    },
  },
  {
    path: '/moncompte',
    name: 'MonCompte',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister/ProFile.vue')
  },
  {
    path: '/incriptionreussi',
    name: 'Inscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister/inscriptionReussi.vue')
  },
  {
    path: '/mesmontgolfieres',
    name: 'mesmontgolfieres',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/MesMontgolfieres.vue'),
    meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
    beforeEnter: (to, from, next) => {
      const userIdRole = store.getters['auth/userIdRole'];
      if (userIdRole === 2) {
        next();
      } else {
        next({ path: '/' });
      }
    }
  },
  {
    path: '/services/montgolfieres/:id',
    name: 'montgolfieres',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/MesMontgolfieres.vue'),
    beforeEnter: async (to, from, next) => {
      const prestataireId = to.params.id;
      const isActivated = await isMontgolfieresActivated(prestataireId);
      if (isActivated) {
        next();
      } else {
        alert('Ce service est désactivé');
      }
    },
  },
  {
    path: '/presta/montgolfieres/:id',
    name: 'montgolfieresPresta',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/MontgolfieresPresta.vue'),
    beforeEnter: async (to, from, next) => {
      const prestataireId = to.params.id;
      const isActivated = await isMontgolfieresActivated(prestataireId);
      if (isActivated) {
        next();
      } else {
        alert('Ce service est désactivé');
      }
    },
  },
  {
    path: '/montgolfiere/:id',
    name: 'MontgolfiereDetail',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/MontgolfiereDetail.vue')
  },
  {
    path: '/planning',
    name: 'planningVue',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/planningVue.vue')
  },
  {
    path: '/ajoutmontgolfiere',
    name: 'ajoutmontgolfiere',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/AjoutMontgolfiere.vue'),
    beforeEnter: (to, from, next) => {
      // Accédez aux getters du store
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];

      // Vérifiez si l'utilisateur est authentifié et que son idRole est 2
      if (isAuthenticated && userIdRole === 2 || userIdRole === 3) {
        next(); // Si l'utilisateur est autorisé, continuez
      } else {
        next({ path: '/billeterie' });
      }
    }
  },
  {
    path: '/orga',
    name: 'orga',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister/OrganisateurMontgolfiere.vue'),
    beforeEnter: (to, from, next) => {
      // Accédez aux getters du store
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];
  
      if (isAuthenticated && userIdRole === 3) {
        next(); // Si l'utilisateur est autorisé, continuez
      } else {
        next({ path: '/' }); 
      }
    }
  },
  {
    path: '/modifier-utilisateur/:id_utilisateur',
    name: 'PageModificationUtilisateur',
    component: () => import('@/components/LoginRegister/Organisation/ModifUtilisateur.vue'),
    props: true,
  },

  {
    path: '/modifier-stand/:id_stand',
    name: 'PageModificationStand',
    component: () => import('@/components/LoginRegister/Organisation/ModifStand.vue'),
    props: true,
  },
  {
    path: '/all-montgolfieres/:id_utilisateur',
    name: 'all-montgolfieres',
    component: () => import('@/components/LoginRegister/Organisation/AllMontgolfieres.vue'),
    props: true,
  },
  {
    path: '/all-stands/:id_utilisateur',
    name: 'all-stands',
    component: () => import('@/components/LoginRegister/Organisation/AllStands.vue'),
    props: true,
  },
  {
    path: '/ajouter-utilisateur',
    name: 'PageAjoutUtilisateur',
    component: () => import('@/components/LoginRegister/Organisation/AjoutUtilisateur.vue'),
  },
   {
     path: '*',
     name: 'not-found',
     component: () => import(/* webpackChunkName: "about" */ '../views/erreurlien/ErreurLien.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0, behavior: 'smooth' }
  }
}
})
export default router
