// store/modules/montgolfiereElmir.js
import axios from 'axios';
import Vue from "vue";


const state = {
    montgolfieres: [],
};

const getters = {
    getMontgolfieres: state => state.montgolfieres,
};

const actions = {
    async fetchMontgolfieres({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/montgolfieres');
            commit('SET_MONTGOLFIERES', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },

    async fetchMontgolfieresByCouleur({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/montgolfieres/couleur');
            commit('SET_MONTGOLFIERES', data.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    },

    async addMontgolfiere({ commit }, nouvelleMontgolfiere) {
        try {
            await axios.post('http://localhost:3030/montgolfieres', nouvelleMontgolfiere);
            commit('ADD_MONTGOLFIERE', nouvelleMontgolfiere);
            // Rechargez la page après l'ajout d'un emplacement (permet d'afficher directement l'ID, car lorsque l'on ajoute un nouvel emplacement, l'id ne s'affiche pas directement
            // location.reload(true);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async updateMontgolfiere({ commit, rootState }, montgolfiereModifiee) {
        try {
            const token = rootState.auth.token;  // Assurez-vous que votre store d'authentification contient le token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:3030/montgolfieres/${montgolfiereModifiee.id_montgolfiere}`, montgolfiereModifiee, config);
            commit('UPDATE_MONTGOLFIERE', montgolfiereModifiee);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },

    async deleteMontgolfiere({ commit, rootState }, idMontgolfiere) {
        try {
            const token = rootState.auth.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3030/montgolfieres/${idMontgolfiere}`, config);
            commit('DELETE_MONTGOLFIERE', idMontgolfiere);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },

    async fetchMontgolfieresByUtilisateur({ commit }, userId) {
        try {
            const response = await axios.get(`http://localhost:3030/montgolfieres/utilisateur/${userId}`);
            const montgolfieres = response.data;
            commit('SET_MONTGOLFIERES', montgolfieres);
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des montgolfières par utilisateur');
        }
    },
};

const mutations = {
    SET_MONTGOLFIERES(state, montgolfieres) {
        state.montgolfieres = montgolfieres;
    },
    ADD_MONTGOLFIERE(state, nouvelleMontgolfiere) {
        state.montgolfieres.push(nouvelleMontgolfiere);
    },
    UPDATE_MONTGOLFIERE(state, montgolfiereModifiee) {
        const index = state.montgolfieres.findIndex(montgolfiere => montgolfiere.id_montgolfiere === montgolfiereModifiee.id_montgolfiere);
        if (index !== -1) {
            // Utilisez Vue.set pour garantir la réactivité
            Vue.set(state.montgolfieres, index, montgolfiereModifiee);
        }
    },
    DELETE_MONTGOLFIERE(state, idMontgolfiere) {
        // Filtrer les emplacements pour exclure celui qui doit être supprimé
        state.montgolfieres = state.montgolfieres.filter((e) => e.id_montgolfiere !== idMontgolfiere);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
