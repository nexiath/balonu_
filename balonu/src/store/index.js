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
import montgolfiereElmir from "@/store/module/montgolfiereElmir";
import vols from "./module/vols";
import stands from "@/store/module/stands";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    montgolfiere : montgo,
    produits,
    catego,
    emplacements: emplacementsModule,
    standsEmplacements: standsModule,
    utilisateurs: usersModule,
    affectationsStand: affectationsStandModule,
    montgolfiereElmir,
    vols,
    stands,
  }
});