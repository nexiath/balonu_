import Vue from 'vue';
import Vuex from 'vuex';
import standService from '../../services/stands.service';

Vue.use(Vuex);

const STAND_MUTATIONS = {
    SET_STANDS: 'SET_STANDS',
    ADD_STAND: 'ADD_STAND',
    UPDATE_STAND: 'UPDATE_STAND',
    DELETE_STAND: 'DELETE_STAND',
};

const state = {
    stands: [],
    standsUtilisateur: [],
    error: null,
};

const getters = {
    getAllStands: state => state.stands,
};

const mutations = {
    [STAND_MUTATIONS.SET_STANDS](state, stands) {
        state.stands = stands;
    },
    [STAND_MUTATIONS.ADD_STAND](state, nouvelEmplacement) {
        state.stands.push(nouvelEmplacement);
    },
    [STAND_MUTATIONS.UPDATE_STAND](state, standModifie) {
        const index = state.stands.findIndex(stand => stand.id_stand === standModifie.id_stand);
        if (index !== -1) {
            Vue.set(state.stands, index, standModifie);
        }
    },
    [STAND_MUTATIONS.DELETE_STAND](state, idStand) {
        state.stands = state.stands.filter((e) => e.id_stand !== idStand);
    },
    [STAND_MUTATIONS.SET_STANDS_UTILISATEUR](state, stands) {
        state.standUtilisateur = stands;
    },
};

const actions = {
    async fetchAllStands({ commit }) {
        try {
            const response = await axios.get('http://localhost:3030/stands');
            commit(STAND_MUTATIONS.SET_STANDS, response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des stands :', error);
            throw new Error('Une erreur s\'est produite lors de la récupération des stands.');
        }
    },
    async fetchStandsUtilisateur({ commit }, userId) {
        try {
            const response = await axios.get(`http://localhost:3030/stands/utilisateur/${userId}`);
            commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES_UTILISATEUR, response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des stands de l\'utilisateur:', error);
            commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
        }
    },
    async createStand({ commit, state },standData) {
        try {
            const response = await axios.post('http://localhost:3030/stands', standData);
            commit(MONTGOLFIERE_MUTATIONS.ADD_MONTGOLFIERE_UTILISATEUR, response.data);
            commit(MONTGOLFIERE_MUTATIONS.SET_MONTGOLFIERES, [...state.stands, response.data]);
        } catch (error) {
            console.error('Erreur lors de la création de la montgolfière:', error);
            commit(MONTGOLFIERE_MUTATIONS.SET_ERROR, error);
        }
    },

    async updateStand({ commit, state }, { id, standData }) {
        try {
            await axios.put(`http://localhost:3030/montgolfieres/${id}`, standData);
            const updateStands = state.stands.map(s => 
                s.id === id ? { ...s, ...standData } : s);
            commit(STAND_MUTATIONS.SET_STANDS, updateStands);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du stand:', error);
        }
    },
    async deleteStand({ commit }, id) {
        try {
            await axios.delete(`http://localhost:3030/stands/${id}`);
            commit(STAND_MUTATIONS.DELETE_STAND, id);
        } catch (error) {
            console.error('Erreur lors de la suppression du Stand:', error);;
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
