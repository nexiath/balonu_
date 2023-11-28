// store/modules/catego.js

import axios from 'axios';

const state = {
    categories: [],
};

const getters = {
    getCategories: state => state.categories,
};

const actions = {
    async fetchCategoriesAction({ commit }) {
        try {
            const response = await axios.get('http://localhost:3030/categories');
            commit('SET_CATEGORIES', response.data);
            return response;
        } catch (error) {
            console.error('Error during fetchCategoriesAction', error);
            throw error;
        }
    },
};

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
