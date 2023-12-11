// volstore.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Définition des types de mutations pour le module des vols
const VOL_MUTATIONS = {
    SET_VOLS: 'SET_VOLS',
    ADD_VOL: 'ADD_VOL',
    UPDATE_VOL: 'UPDATE_VOL',
    REMOVE_VOL: 'REMOVE_VOL',
    SET_ERROR: 'SET_ERROR',
};

// Module Vuex pour les vols
const volModule = {
    namespaced: true,

    state: {
        vols: [],
        error: null,
    },

    mutations: {
        [VOL_MUTATIONS.SET_VOLS](state, vols) {
            state.vols = vols;
        },
        [VOL_MUTATIONS.ADD_VOL](state, vol) {
            state.vols.push(vol);
        },
        [VOL_MUTATIONS.UPDATE_VOL](state, updatedVol) {
            const index = state.vols.findIndex(v => v.id_vol === updatedVol.id_vol);
            if (index !== -1) {
                Vue.set(state.vols, index, updatedVol);
            }
        },
        [VOL_MUTATIONS.REMOVE_VOL](state, id_vol) {
            state.vols = state.vols.filter(v => v.id_vol !== id_vol);
        },
        [VOL_MUTATIONS.SET_ERROR](state, error) {
            state.error = error;
        },
    },

    actions: {
        async fetchVols({ commit }) {
            try {
                const response = await axios.get('http://localhost:3030/vols');
                commit(VOL_MUTATIONS.SET_VOLS, response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des vols:', error);
                commit(VOL_MUTATIONS.SET_ERROR, error);
            }
        },
        async createVol({ commit }, volData) {
            try {
                const response = await axios.post('http://localhost:3030/vols', volData);
                commit(VOL_MUTATIONS.ADD_VOL, response.data);
            } catch (error) {
                console.error('Erreur lors de la création du vol:', error);
                commit(VOL_MUTATIONS.SET_ERROR, error);
            }
        },
        async updateVol({ commit }, { id_vol, volData }) {
            try {
                const response = await axios.put(`http://localhost:3030/vols/${id_vol}`, volData);
                commit(VOL_MUTATIONS.UPDATE_VOL, response.data);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du vol:', error);
                commit(VOL_MUTATIONS.SET_ERROR, error);
            }
        },
        async deleteVol({ commit }, id_vol) {
            try {
                await axios.delete(`http://localhost:3030/vols/${id_vol}`);
                commit(VOL_MUTATIONS.REMOVE_VOL, id_vol);
            } catch (error) {
                console.error('Erreur lors de la suppression du vol:', error);
                commit(VOL_MUTATIONS.SET_ERROR, error);
            }
        },
    },
};

// Création et exportation du store
export default new Vuex.Store({
    modules: {
        vol: volModule
    }
});
