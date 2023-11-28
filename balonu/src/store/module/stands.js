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
};

const actions = {
    async fetchAllStands({ commit }) {
        try {
            const stands = await standService.getAllStands();
            commit(STAND_MUTATIONS.SET_STANDS, stands.stands);
        } catch (error) {
            console.error('Erreur lors de la récupération des stands :', error);
            throw new Error('Une erreur s\'est produite lors de la récupération des stands.');
        }
    },
    async createNewStand({ commit, state }, standDetails) {
        try {
            const newStand = await standService.createStand(
                standDetails.libelle_stand,
                standDetails.description_stand,
                standDetails.image_stand,
                standDetails.id_emplacement
            );
            commit(STAND_MUTATIONS.ADD_STAND, newStand);
            commit(STAND_MUTATIONS.SET_STANDS, [...state.stands, newStand]);
        } catch (error) {
            console.error('Erreur lors de la création du stand :', error);
            throw new Error('Échec de la création du stand');
        }
    },

    async updateExistingStand({ commit, state }, updatedStandDetails) {
        try {
            const updatedStand = await standService.updateStand(
                updatedStandDetails.id_stand,
                updatedStandDetails.libelle_stand,
                updatedStandDetails.description_stand,
                updatedStandDetails.image_stand,
                updatedStandDetails.id_emplacement
            );
            commit(STAND_MUTATIONS.UPDATE_STAND, updatedStand);
            const updatedStands = state.stands.map(stand =>
                stand.id_stand === updatedStand.id_stand ? updatedStand : stand
            );
            commit(STAND_MUTATIONS.SET_STANDS, updatedStands);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du stand :', error);
            throw new Error('Échec de la mise à jour du stand');
        }
    },
    async deleteStand({ commit, state }, id) {
        try {
            await standService.deleteStand(id);
            commit(STAND_MUTATIONS.DELETE_STAND, id);
            const filteredStands = state.stands.filter(stand => stand.id_stand !== id);
            commit(STAND_MUTATIONS.SET_STANDS, filteredStands);
        } catch (error) {
            console.error('Erreur lors de la suppression du stand :', error);
            throw new Error('Échec de la suppression du stand');
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
