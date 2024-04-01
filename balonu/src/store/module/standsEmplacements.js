// store/modules/standsEmplacements.js
import axios from 'axios';
import Vue from "vue";


const state = {
    stands: [],
    selectedStand: null, // Ajoutez un état pour stocker le stand sélectionné
    boutiqueStandCount: [], // Add this state
    restaurantStandCount: [], // Add this state
};

const getters = {
    getStands: state => state.stands,
    getSelectedStand: state => state.selectedStand,
    getBoutiqueStandCount: state => state.boutiqueStandCount, // Add this getter
    getRestaurantStandCount: state => state.restaurantStandCount, // Add this getter

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

    async fetchBoutiqueCount({ commit }) {
        try {
            const boutiqueCount = await axios.get('http://localhost:3030/stands/nombreBoutiques');
            commit('SET_BOUTIQUE_STAND_COUNT', boutiqueCount.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },

    async fetchRestaurantCount({ commit }) {
        try {
            const restaurantCount = await axios.get('http://localhost:3030/stands/nombreRestaurants');
            commit('SET_RESTAURANT_STAND_COUNT', restaurantCount.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async fetchStandById({ commit }, standId) {
        try {
            const stand = await axios.get(`http://localhost:3030/stands/${standId}`);
            commit('SET_SELECTED_STAND', stand.data);
        } catch (error) {
            console.error('Error during fetchStandById:', error);
            throw new Error('Error fetching stand by ID. Please try again.');
        }
    },
    async addStand({ commit }, nouveauStand) {
        try {
            await axios.post('http://localhost:3030/stands', nouveauStand);
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
            console.log("Action Vuex - updateStand: standModifie", standModifie);

            // Effectuer la mise à jour via Axios
            await axios.put(`http://localhost:3030/stands/${standModifie.id_stand}`, standModifie);

            console.log("Action Vuex - updateStand: Mise à jour réussie");

            // Mettre à jour le store Vuex
            commit('UPDATE_STAND', standModifie);

            console.log("Action Vuex - updateStand: Mise à jour du store Vuex réussie");
        } catch (error) {
            console.error("Action Vuex - updateStand: Erreur lors de la mise à jour", error);
            alert(error);
        }
    },
    async deleteStand({ commit }, idStand) {
        try {
            // Effectuer la suppression via Axios
            await axios.delete(`http://localhost:3030/stands/${idStand}`);

            // Si la suppression réussit, mettre à jour le store Vuex
            commit('DELETE_STAND', idStand);
        } catch (error) {
            // Gérer les erreurs
            console.error('Error during deleteStand:', error);

            // Vous pouvez afficher un message d'erreur à l'utilisateur si nécessaire
            alert('Error during deleteStand. Please try again.');

            // Vous pouvez également lancer l'erreur à un niveau supérieur si vous souhaitez
            throw error;
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
    SET_BOUTIQUE_STAND_COUNT(state, count) { // Add this mutation
        state.boutiqueStandCount = count;
    },
    SET_RESTAURANT_STAND_COUNT(state, count) { // Add this mutation
        state.restaurantStandCount = count;
    },
    ADD_STAND(state, nouveauStand) {
        state.stands.push(nouveauStand);
    },
    UPDATE_STAND(state, standModifie) {
        console.log("Mutation Vuex - UPDATE_STAND: standModifie", standModifie);

        const index = state.stands.findIndex(stand => stand.id_stand === standModifie.id_stand);
        if (index !== -1) {
            Vue.set(state.stands, index, standModifie);
        }
    },
    DELETE_STAND(state, idStand) {
        // Filtrer les emplacements pour exclure celui qui doit être supprimé
        state.stands = state.stands.filter((e) => e.id_stand !== idStand);
    },
    SET_SELECTED_STAND(state, stand) {
        state.selectedStand = stand;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
