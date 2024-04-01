// store/modules/emplacements.js
import axios from 'axios';
import Vue from "vue";


const state = {
    emplacements: [],
    emplacementsWithoutStand: [], // Ajout de l'état pour les emplacements sans stand
};

const getters = {
    getEmplacements: state => state.emplacements,
    getEmplacementsWithoutStand: state => state.emplacementsWithoutStand, // Ajout du getter
};

const actions = {
    async fetchEmplacements({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/emplacements');
            commit('SET_EMPLACEMENTS', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async addEmplacement({ commit }, nouvelEmplacement) {
        try {
            await axios.post('http://localhost:3030/emplacements', nouvelEmplacement);
            commit('ADD_EMPLACEMENT', nouvelEmplacement);
            // Rechargez la page après l'ajout d'un emplacement (permet d'afficher directement l'ID, car lorsque l'on ajoute un nouvel emplacement, l'id ne s'affiche pas directement
            // location.reload(true);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async updateEmplacement({ commit }, emplacementModifie) {
        try {
            await axios.put(`http://localhost:3030/emplacements/${emplacementModifie.id_emplacement}`, emplacementModifie);
            commit('UPDATE_EMPLACEMENT', emplacementModifie);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async deleteEmplacement({ commit }, idEmplacement) {
        try {
            await axios.delete(`http://localhost:3030/emplacements/${idEmplacement}`);
            commit('DELETE_EMPLACEMENT', idEmplacement);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async fetchEmplacementsWithoutStand({ commit }) {
        try {
            const response = await axios.get('http://localhost:3030/emplacements/withoutstand');
            const emplacementsWithoutStand = response.data;
            commit('SET_EMPLACEMENTS_WITHOUT_STAND', emplacementsWithoutStand);
        } catch (error) {
            console.error('Error during fetchEmplacementsWithoutStand:', error);
            throw new Error('Error fetching emplacements without stand. Please try again.');
        }
    },

};

const mutations = {
    SET_EMPLACEMENTS(state, emplacements) {
        state.emplacements = emplacements;
    },
    ADD_EMPLACEMENT(state, nouvelEmplacement) {
        state.emplacements.push(nouvelEmplacement);
    },
    UPDATE_EMPLACEMENT(state, emplacementModifie) {
        const index = state.emplacements.findIndex(emplacement => emplacement.id_emplacement === emplacementModifie.id_emplacement);
        if (index !== -1) {
            // Utilisez Vue.set pour garantir la réactivité
            Vue.set(state.emplacements, index, emplacementModifie);
        }
    },
    DELETE_EMPLACEMENT(state, idEmplacement) {
        // Filtrer les emplacements pour exclure celui qui doit être supprimé
        state.emplacements = state.emplacements.filter((e) => e.id_emplacement !== idEmplacement);
    },
    SET_EMPLACEMENTS_WITHOUT_STAND(state, emplacementsWithoutStand) {
        state.emplacementsWithoutStand = emplacementsWithoutStand;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
