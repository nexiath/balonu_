// store/modules/vols.js
import axios from 'axios';
import Vue from "vue";


const state = {
    vols: [],
    volsParcoursA: [],
    volsParcoursB: [],
};

const getters = {
    getVols: state => state.vols,
    getVolsParcoursA: state => state.volsParcoursA,
    getVolsParcoursB: state => state.volsParcoursB,
};

const actions = {
    async fetchVols({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/vols');
            commit('SET_VOLS', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async fetchVolsByParcoursA({ commit }, id_parcours) {
        try {
            // Utilisez la route spécifique pour récupérer les vols par parcours
            const response = await axios.get(`http://localhost:3030/vols/parcours/${id_parcours}`);
            commit('SET_VOLS_PARCOURS_A', response.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async fetchVolsByParcoursB({ commit }, id_parcours) {
        try {
            // Utilisez la route spécifique pour récupérer les vols par parcours
            const response = await axios.get(`http://localhost:3030/vols/parcours/${id_parcours}`);
            commit('SET_VOLS_PARCOURS_B', response.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },

    async addVol({ commit }, nouveauVol) {
        try {
            await axios.post('http://localhost:3030/vols', nouveauVol);
            commit('ADD_VOL', nouveauVol);
            // Rechargez la page après l'ajout d'un emplacement (permet d'afficher directement l'ID, car lorsque l'on ajoute un nouvel emplacement, l'id ne s'affiche pas directement
            // location.reload(true);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async updateVol({ commit }, volModifie) {
        try {
            await axios.put(`http://localhost:3030/montgolfieres/${volModifie.id_vol}`, volModifie);
            commit('UPDATE_VOL', volModifie);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async deleteVol({ commit }, idVol) {
        try {
            await axios.delete(`http://localhost:3030/montgolfieres/${idVol}`);
            commit('DELETE_VOL', idVol);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
};

const mutations = {
    SET_VOLS(state, vols) {
        state.vols = vols;
    },
    SET_VOLS_PARCOURS_A(state, volsParcoursA) {
        state.volsParcoursA = volsParcoursA;
    },
    SET_VOLS_PARCOURS_B(state, volsParcoursB) {
        state.volsParcoursB = volsParcoursB;
    },
    ADD_VOL(state, nouveauVol) {
        state.vols.push(nouveauVol);
    },
    UPDATE_VOL(state, volModifie) {
        const index = state.vols.findIndex(vol => vol.id_vol === volModifie.id_vol);
        if (index !== -1) {
            // Utilisez Vue.set pour garantir la réactivité
            Vue.set(state.vols, index, volModifie);
        }
    },
    DELETE_VOL(state, idVol) {
        // Filtrer les emplacements pour exclure celui qui doit être supprimé
        state.vols = state.vols.filter((e) => e.id_vol !== idVol);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
