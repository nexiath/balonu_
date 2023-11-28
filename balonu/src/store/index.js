import Vue from 'vue';
import Vuex from 'vuex';
import auth from './module/auth';
import montgo from './module/montgo';
import produits from './module/produits';
import catego from './module/catego';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    montgolfiere : montgo,
    produits,
    catego,
  }
});