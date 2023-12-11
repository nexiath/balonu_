import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    passes: [],
    cart: []
  },
  mutations: {
    SET_PASSES(state, passes) {
      state.passes = passes;
    },
    ADD_TO_CART(state, item) {
      const existingItemIndex = state.cart.findIndex(i => i.pass_id === item.pass_id);
      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...state.cart[existingItemIndex],
          quantity: state.cart[existingItemIndex].quantity + item.quantity
        };

        Vue.set(state.cart, existingItemIndex, updatedItem);
      } else {
        state.cart.push(item);
      }
    }
  },
  actions: {
    fetchPasses({ commit }) {
      return axios.get('http://localhost:3000/passes')
        .then(response => {
          commit('SET_PASSES', response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des passes:', error);
          throw error; 
        });
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    updatePasses({ commit }, passes) {
        commit('SET_PASSES', passes);
      }
  }
});