import axios from 'axios';


const state = {
    utilisateurs: [],
};

const getters = {
    getUtilisateurs: state => state.utilisateurs,
    getUtilisateurById: state => id => state.utilisateurs.find(utilisateur => utilisateur.id_utilisateur === id),

};

const actions = {
    async fetchUtilisateurs({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/utilisateurs');
            commit('SET_UTILISATEURS', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async fetchUtilisateurByIdUtilisateur({ commit }, id_utilisateur) {
        try {
            const response = await axios.get(`http://localhost:3030/utilisateurs/${id_utilisateur}`);
            const utilisateur = response.data;
            commit('ADD_UTILISATEUR', utilisateur);
            console.log('Utilisateur dans l\'action Vuex :', utilisateur);
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération de l\'utilisateur lié à l\'ID');
        }
    },
    async createUser({ commit }, utilisateurData) {
        try {
            const response = await axios.post('http://localhost:3030/utilisateurs', utilisateurData);
            const utilisateur = response.data;
            commit('ADD_UTILISATEUR', utilisateur);
            console.log('Utilisateur créé avec succès :', utilisateur);
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }
    },
    async updateUserDetails({ commit }, id_utilisateur) {
        try {
            const response = await axios.put(`http://localhost:3030/utilisateurs/${id_utilisateur}`);
            const updatedDetails = response.data;
            commit('UPDATE_UTILISATEUR_DETAILS', updatedDetails);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des détails de l\'utilisateur:', error);
            return false;
        }
    },
};

const mutations = {
    SET_UTILISATEURS(state, utilisateurs) {
        console.log('Mutation SET_UTILISATEURS appelée avec :', utilisateurs);
        state.utilisateurs = utilisateurs;
    },
    ADD_UTILISATEUR(state, utilisateur) {
        state.utilisateurs.push(utilisateur);
    },
    UPDATE_UTILISATEUR_DETAILS(state, updatedDetails) {
        const index = state.utilisateurs.findIndex(user => user.id_utilisateur === updatedDetails.id_utilisateur);
        if (index !== -1) {
            state.utilisateurs.splice(index, 1, updatedDetails);
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
