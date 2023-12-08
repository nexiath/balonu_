// store/modules/parcoursVols.js
import axios from 'axios';

const state = {
  parcours: [],
  vols: [],
};

const getters = {
  getAllParcours: state => state.parcours,
  getParcoursById: state => id => state.parcours.find(parcour => parcour.id_parcours === id),
  getAllVols: state => state.vols,
  getVolById: state => id => state.vols.find(vol => vol.id_vol === id),
};

const actions = {
  async fetchParcours({ commit }) {
    try {
      const response = await axios.get('http://localhost:3030/parcours');
      commit('SET_PARCOURS', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchVols({ commit }) {
    try {
      const response = await axios.get('http://localhost:3030/vols');
      commit('SET_VOLS', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateVol({ commit }, vol) {
    try {
      const response = await axios.put(`http://localhost:3030/vols/${vol.id_vol}`, vol);
      commit('UPDATE_VOL', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteVol({ commit }, id_vol) {
    try {
      await axios.delete(`http://localhost:3030/vols/${id_vol}`);
      commit('DELETE_VOL', id_vol);
    } catch (error) {
      console.error(error);
    }
  },
  async updateParcours({ commit }, parcours) {
    try {
      const response = await axios.put(`http://localhost:3030/parcours/${parcours.id_parcours}`, parcours);
      commit('UPDATE_PARCOURS', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteParcours({ commit }, id_parcours) {
    try {
      await axios.delete(`http://localhost:3030/parcours/${id_parcours}`);
      commit('DELETE_PARCOURS', id_parcours);
    } catch (error) {
      console.error(error);
    }
  },
  // Autres actions pour fetch/update/delete spécifiques pour parcours et vols
};

const mutations = {
  SET_PARCOURS(state, parcours) {
    state.parcours = parcours;
  },
  SET_VOLS(state, vols) {
    state.vols = vols;
  },
  UPDATE_VOL(state, updatedVol) {
    const index = state.vols.findIndex(vol => vol.id_vol === updatedVol.id_vol);
    if (index !== -1) {
      state.vols.splice(index, 1, updatedVol);
    }
  },
  DELETE_VOL(state, id_vol) {
    state.vols = state.vols.filter(vol => vol.id_vol !== id_vol);
  },
  UPDATE_PARCOURS(state, updatedParcours) {
    const index = state.parcours.findIndex(parcours => parcours.id_parcours === updatedParcours.id_parcours);
    if (index !== -1) {
      state.parcours.splice(index, 1, updatedParcours);
    }
  },
  DELETE_PARCOURS(state, id_parcours) {
    state.parcours = state.parcours.filter(parcours => parcours.id_parcours !== id_parcours);
  },
  // Autres mutations pour update/delete/add spécifiques pour parcours et vols
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
