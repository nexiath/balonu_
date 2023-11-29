// store/modules/affectationsStand.js
import axios from 'axios';
import Vue from "vue";

const state = {
    affectationsStand: [],
};

const getters = {
    getAffectationsStand: state => state.affectationsStand,
};

const actions = {
    async fetchAffectationsStand({ commit, dispatch }) {
        try {
            const data = await axios.get('http://localhost:3030/relations/affectationsStand');
            commit('SET_AFFECTATIONSSTAND', data.data);
            dispatch('users/fetchUtilisateurs', null, { root: true }); // Appel à l'action fetchUtilisateurs dans le module users
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async fetchAffectationsStandByIdStand({ commit }, id_stand) {
        try {
            const response = await axios.get(`http://localhost:3030/relations/affectationsStand/${id_stand}`);
            const affectationsStand = response.data;

            commit('SET_AFFECTATIONSSTAND', affectationsStand);

            // Utilisez Vue.set pour éviter les problèmes d'observabilité
            Vue.set(affectationsStand, 'id_utilisateur', affectationsStand.id_utilisateur);
            Vue.set(affectationsStand, 'id_stand', affectationsStand.id_stand);

            console.log('Affectations de stands dans l\'action Vuex :', affectationsStand);

            // Résoudre la promesse avec l'ID de l'utilisateur
            return Promise.resolve(affectationsStand.id_utilisateur);
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des affectations de stands');
        }
    },
};

const mutations = {
    SET_AFFECTATIONSSTAND(state, affectationsStand) {
        console.log('Mutation SET_AFFECTATIONSSTAND appelée avec :', affectationsStand);
        state.affectationsStand = affectationsStand;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
