import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const MONTGOLFIERE_MUTATIONS = {
    SET_MONTGOLFIERES: 'SET_MONTGOLFIERES',
    SET_MONTGOLFIERE: 'SET_MONTGOLFIERE',
    SET_MONTGOLFIERES_UTILISATEUR: 'SET_MONTGOLFIERES_UTILISATEUR',
    ADD_MONTGOLFIERE_UTILISATEUR: 'ADD_MONTGOLFIERE_UTILISATEUR',
    REMOVE_MONTGOLFIERE: 'REMOVE_MONTGOLFIERE',
    SET_ERROR: 'SET_ERROR',
};

const montgolfiereModule = {
    namespaced: true,

    state: {
        montgolfieres: [],
        montgolfiere: null,
        montgolfieresUtilisateur: [],
        error: null,
    },

    mutations: {
        [MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES](state, montgolfieres) {
            state.montgolfieres = montgolfieres;
        },
        [MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERE](state, montgolfiere) {
            state.montgolfiere = montgolfiere;
        },
        [MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES_UTILISATEUR](state, montgolfieres) {
            state.montgolfieresUtilisateur = montgolfieres;
        },
        [MONTGOLFIERE_MUTATIONS.ADD_MONTGOLFIERE_UTILISATEUR](state, montgolfiere) {
            state.montgolfieresUtilisateur.push(montgolfiere);
        },
        [MONTGOLFIERE_MUTATIONS.REMOVE_MONTGOLFIERE](state, id) {
            state.montgolfieres = state.montgolfieres.filter(m => m.id !== id);
        },
        [MONTGOLFIERE_MUTATIONS.SET_ERROR](state, error) {
            state.error = error;
        },
    },

    actions: {
        async fetchMontgolfieres({ commit }) {
            try {
                const response = await axios.get('http://localhost:3030/montgolfieres');
                commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES, response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des montgolfières:', error);
                commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
            }
        },
        async fetchMontgolfieresUtilisateur({ commit }, userId) {
            try {
                const response = await axios.get(`http://localhost:3030/montgolfieres/utilisateur/${userId}`);
                commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES_UTILISATEUR, response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des montgolfières de l\'utilisateur:', error);
                commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
            }
        },
        async createMontgolfiere({ commit, state }, montgolfiereData) {
            try {
                const response = await axios.post('http://localhost:3030/montgolfieres', montgolfiereData);
                commit(MONTGOLFIERE_MUTATIONS.ADD_MONTGOLFIERE_UTILISATEUR, response.data);
                commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES, [...state.montgolfieres, response.data]);
            } catch (error) {
                console.error('Erreur lors de la création de la montgolfière:', error);
                commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
            }
        },
        async updateMontgolfiere({ commit, state }, { id, montgolfiereData }) {
            try {
                await axios.put(`http://localhost:3030/montgolfieres/${id}`, montgolfiereData);
                const updatedMontgolfieres = state.montgolfieres.map(m => 
                    m.id === id ? { ...m, ...montgolfiereData } : m);
                commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES, updatedMontgolfieres);
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la montgolfière:', error);
                commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
            }
        },
        async deleteMontgolfiere({ commit }, id) {
            try {
                await axios.delete(`http://localhost:3030/montgolfieres/${id}`);
                commit(MONTGOLFIERE_MUTATIONS.REMOVE_MONTGOLFIERE, id);
            } catch (error) {
                console.error('Erreur lors de la suppression de la montgolfière:', error);
                commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
            }
        },
    },
};

export default new Vuex.Store({
    modules: {
        montgo: montgolfiereModule
    }
});
