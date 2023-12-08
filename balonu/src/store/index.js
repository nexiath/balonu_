import Vue from 'vue';
import Vuex from 'vuex';
import auth from './module/auth';
import montgo from './module/montgo';
import produits from './module/produits';
import catego from './module/catego';
import emplacementsModule from './module/emplacements';
import standsModule from './module/standsEmplacements';
import usersModule from './module/users'
import affectationsStandModule from "./module/affectationsStands";
import pass from "./module/pass"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    montgolfiere : montgo,
    produits,
    catego,
    pass,
    emplacements: emplacementsModule,
    standsEmplacements: standsModule,
    utilisateurs: usersModule,
    affectationsStand: affectationsStandModule
  }
});