import Vue from 'vue';
import Vuex from 'vuex';
import couleurService from '../../services/couleur.service';

Vue.use(Vuex);

const state = {
  couleurs: []
};

const mutations = {
  SET_COULEURS(state, couleurs) {
    state.couleurs = couleurs;
  }
};

const actions = {
  async fetchCouleurs({ commit }) {
    try {
      const couleurs = await couleurService.getCouleurs();
      commit('SET_COULEURS', couleurs);
    } catch (error) {
      console.error("Erreur lors de la récupération des couleurs", error);
    }
  }
};

const getters = {
  allCouleurs: state => state.couleurs 
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
