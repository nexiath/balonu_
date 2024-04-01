import axios from 'axios';

const state = {
  prestataire: [],
};

const getters = {
  getPrestataire: state => state.prestataire,
};

const actions = {
async fetchPrestataireById({ commit }, userId) {
    try {
        const response = await axios.get(`http://localhost:3030/presta/${userId}`);
        commit('SET_PRESTATAIRE', response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération du prestataire:', error);
        throw error;
    }
    },
  async addPrestataire({ commit }, nouveauPrestataire) {
    try {
      const response = await axios.post('http://localhost:3030/presta', nouveauPrestataire);
      commit('ADD_PRESTATAIRE', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du prestataire:', error);
      throw error;
    }
  },
  async updatePrestataire({ commit }, modifPrestataire) {
    try {
      await axios.put(`http://localhost:3030/presta/${modifPrestataire.id_profil}`, modifPrestataire);
      commit('UPDATE_PRESTATAIRE', modifPrestataire);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prestataire:', error);
      throw error;
    }
  },
  async deletePrestataire({ commit }, idPrestataire) {
    try {
      await axios.delete(`http://localhost:3030/presta/${idPrestataire}`);
      commit('DELETE_PRESTATAIRE', idPrestataire);
    } catch (error) {
      console.error('Erreur lors de la suppression du prestataire:', error);
      throw error;
    }
  },
};

const mutations = {
  SET_PRESTATAIRES(state, prestataire) {
    state.prestataires = prestataire;
  },
  ADD_PRESTATAIRE(state, nouveauPrestataire) {
    state.prestataires.push(nouveauPrestataire);
  },
  UPDATE_PRESTATAIRE(state, modifPrestataire) {
    state.prestataires = state.prestataires.map(prestataire => {
      if (prestataire.id_profil === modifPrestataire.id_profil) {
        return modifPrestataire;
      }
      return prestataire;
    });
  },
  DELETE_PRESTATAIRE(state, idPrestataire) {
    state.prestataires = state.prestataires.filter(prestataire => prestataire.id_profil !== idPrestataire);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
