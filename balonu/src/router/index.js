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



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    component: checkout
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
    path: '/prestataire',
    name: 'MongolfierePrestataire',
    component: MongolfierePrestataire
  },
  {
    path: '/ajoutstand',
    name: 'ajoutstand',
    component: () => import(/* webpackChunkName: "about" */ '../components/Services/Stands/AjoutStand.vue')
  },
  {
    path: '/stands',
    name: 'stands',
    component: () => import('../views/StandsView.vue'),  
  },
  {
    path: '/ajoutproduits',
    name: 'ajoutproduits',
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
  {
    path: '/addvol',
    name: 'addvol',
    component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/LienVol.vue')
  },
  {
    path: '/passlist',
    name: 'passlist',
    component: () => import(/* webpackChunkName: "about" */ '../components/passes/PassList.vue')
  },

  {
    path: '/stand/:id',
    name: 'Stand',
    component: () => import(/* webpackChunkName: "stand" */ '../views/Services/ProduitsView.vue'),
    props: true,  // permet de passer des paramètres comme des props
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
    beforeEnter: (to, from, next) => {
      // Accédez aux getters du store
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      const userIdRole = store.getters['auth/userIdRole'];
  
      // Vérifiez si l'utilisateur est authentifié et que son idRole est 2
      if (isAuthenticated && userIdRole === 2) {
        next(); // Si l'utilisateur est autorisé, continuez
      } else {
        next({ path: '/' }); 
      }
    }
  },
  {
    path: '/listeuser',
    name: 'listeuser',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegister/UserList.vue'),
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
  path: '/ajoutmontgolfiere',
  name: 'ajoutmontgolfiere',
  component: () => import(/* webpackChunkName: "about" */ '../components/Billeterie/MesMontgol/AjoutMontgolfiere.vue'),
  beforeEnter: (to, from, next) => {
    // Accédez aux getters du store
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const userIdRole = store.getters['auth/userIdRole'];

    // Vérifiez si l'utilisateur est authentifié et que son idRole est 2
    if (isAuthenticated && userIdRole === 2) {
      next(); // Si l'utilisateur est autorisé, continuez
    } else {
      next({ path: '/billeterie' }); 
    }
  }
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
