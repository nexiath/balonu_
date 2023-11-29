// store/modules/standsEmplacements.js
import axios from 'axios';
import Vue from "vue";


const state = {
    stands: [],
};

const getters = {
    getStands: state => state.stands,
};

const actions = {
    async fetchStands({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/stands');
            commit('SET_STANDS', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async addStand({ commit }, nouveauStand) {
        try {
            await axios.post('http://localhost:3030/emplacements', nouveauStand);
            commit('ADD_STAND', nouveauStand);
            // Rechargez la page après l'ajout d'un emplacement (permet d'afficher directement l'ID, car lorsque l'on ajoute un nouvel emplacement, l'id ne s'affiche pas directement
            // location.reload(true);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async updateStand({ commit }, standModifie) {
        try {
            await axios.put(`http://localhost:3030/emplacements/${standModifie.id_stand}`, standModifie);
            commit('UPDATE_STAND', standModifie);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async deleteStand({ commit }, idStand) {
        try {
            await axios.delete(`http://localhost:3030/emplacements/${idStand}`);
            commit('DELETE_STAND', idStand);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async fetchStandsByEmplacement({ commit }, id_emplacement) {
        try {
            const response = await axios.get(`http://localhost:3030/stands/emplacements/${id_emplacement}`);
            const stands = response.data;
            commit('SET_STANDS', stands);
            console.log('Stands dans l\'action Vuex :', stands);
            // Supposons que vous souhaitez retourner l'ID du premier stand
            const standId = stands.length > 0 ? stands[0].id_stand : null;

            // Résoudre la promesse avec l'ID du stand
            return Promise.resolve(standId);
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des stands liés à l\'emplacement');
        }
    },

};

const mutations = {
    SET_STANDS(state, stands) {
        console.log('Mutation SET_STANDS appelée avec :', stands);
        state.stands = stands;
    },
    ADD_STAND(state, nouveauStand) {
        state.stands.push(nouveauStand);
    },
    UPDATE_STAND(state, standModifie) {
        const index = state.stands.findIndex(stand => stand.id_stand === standModifie.id_stand);
        if (index !== -1) {
            // Utilisez Vue.set pour garantir la réactivité
            Vue.set(state.stands, index, standModifie);
        }
    },
    DELETE_STAND(state, idStand) {
        // Filtrer les emplacements pour exclure celui qui doit être supprimé
        state.stands = state.stands.filter((e) => e.id_stand !== idStand);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
