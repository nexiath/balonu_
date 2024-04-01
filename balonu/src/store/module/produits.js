// store/modules/produits.js

import axios from 'axios';

const state = {
    produits: [],
};

const getters = {
    getProduits: state => state.produits,
};

const actions = {
    async fetchProduits({ commit }) {
        try {
            const data = await axios.get('http://localhost:3030/produits');
            commit('SET_PRODUITS', data.data);
        } catch (error) {
            console.error('Error during fetchProduits', error);
            throw error;
        }
    },
    async addProduit({ commit }, nouveauProduit) {
        try {
            const response = await axios.post('http://localhost:3030/produits', nouveauProduit);
            commit('ADD_PRODUIT', response.data);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async updateProduit({ commit }, modifProduit) {
        try {
            await axios.put(`http://localhost:3030/produits/${modifProduit.id_produit}`, modifProduit);
            commit('UPDATE_PRODUIT', modifProduit);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    },
    async deleteProduit({ commit }, deleteProduit) {
        try {
            await axios.delete(`http://localhost:3030/produits/${deleteProduit.id_produit}`);
            commit('DELETE_PRODUIT', deleteProduit.id_produit);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.error("Erreur: Impossible de supprimer le produit. Le produit n'a pas d'id ou est lié à d'autres données.");
            } else {
                alert(error);
                console.error(error);
            }
        }
    },
    async fetchProduitsByStand({ commit }, standId) {
        try {
            const response = await axios.get(`http://localhost:3030/relations/produitsByStand/${standId}`);
            const produitsByStand = response.data;
            commit('SET_PRODUITS', produitsByStand);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits par stand:", error);
            throw error;
        }
    },
    async fetchProduitsAndCheckOwnership({ dispatch, commit, rootState }) {
        // Assurez-vous que l'utilisateur est connecté avant d'effectuer ces opérations
        if (rootState.auth.userId) {
            // Récupérez l'ID du stand associé à l'utilisateur
            const id_stand = rootState.auth.standId;

            // Utilisez l'action fetchProduitsByStand définie ci-dessus
            await dispatch('fetchProduitsByStand', id_stand);

            // Vérifiez la propriété du stand ici et mettez à jour le store auth si nécessaire
            const isUserStandOwner = true; // Remplacez ceci par votre logique réelle
            commit('auth/setUserStandOwnership', isUserStandOwner, { root: true });
        }
    },
    async updateStock({ commit }, { productId, newStock }) {
        try {
            // Appelez votre API ou effectuez toute opération nécessaire pour mettre à jour le stock côté serveur
            // Supposons que vous avez une API pour mettre à jour le stock
            const response = await axios.put(`http://localhost:3030/produits/${productId}/updateStock`, { newStock });

            // Si la mise à jour côté serveur réussit, commettez la mutation pour mettre à jour le stock côté client
            commit('UPDATE_STOCK', { productId, newStock });

            return response;
        } catch (error) {
            // Gérez les erreurs
            console.error("Erreur lors de la mise à jour du stock :", error);
            throw error;
        }
    },

};

const mutations = {
    SET_PRODUITS(state, produits) {
        state.produits = produits;
    },
    SET_USER_STAND_OWNERSHIP(state, isOwner) {
        state.isUserStandOwner = isOwner !== undefined ? isOwner : false;
    },
    ADD_PRODUIT(state, nouveauProduit) {
        state.produits.push(nouveauProduit);
    },
    UPDATE_PRODUIT(state, modifProduit) {
        state.produits = state.produits.map(produit => {
            if (produit.id_produit === modifProduit.id_produit) {
                return modifProduit;
            }
            return produit;
        });
    },
    updateProduit(state, updatedProduit) {
        const index = state.produits.findIndex(p => p.id_produit === updatedProduit.id_produit);
        if (index !== -1) {
            // Mettez à jour le produit dans le tableau
            state.produits.splice(index, 1, updatedProduit);
        }
    },
    supprimerProduit(state, index) {
        state.produits.splice(index, 1);
    },
    DELETE_PRODUIT(state, deletedProductId) {
        state.produits = state.produits.filter(produit => produit.id_produit !== deletedProductId);
    },
    UPDATE_STOCK(state, { productId, newStock }) {
        // Mettez à jour la quantité côté client
        state.produits = state.produits.map(produit => {
            if (produit.id_produit === productId) {
                produit.quantite_produit = newStock;
            }
            return produit;
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
