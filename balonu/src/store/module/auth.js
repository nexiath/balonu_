import Vue from 'vue';
import Vuex from 'vuex';
import { utilisateurService } from '../../services/utilisateur.service';

Vue.use(Vuex);


function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    return true; 
  }

  try {
    const payloadBase64 = parts[1];
    const decodedJson = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedJson);
    const exp = decodedToken.exp;
    const now = new Date();
    return now.getTime() > exp * 1000;
  } catch (error) {
    return true; 
  }
}

const state = {
  token: localStorage.getItem('authToken') || null,
  userID: localStorage.getItem('userID') || null,
  userDetails: null,
  message: null
};

const getters = {
  isAuthenticated: state => !isTokenExpired(state.token),
  userDetails: state => state.userDetails,
  userIdRole: state => state.userDetails ? state.userDetails.id_role : null,
  userID: state => state.userID
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('authToken', token);
  },
  SET_USER_ID(state, userID) {
    state.userID = userID;
    localStorage.setItem('userID', userID); 
  },
  SET_USER_DETAILS(state, userDetails) {
    state.userDetails = userDetails;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  }
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await utilisateurService.login(credentials);
      const token = response.token;
      const userID = response.utilisateur.id_utilisateur; 
      if (token) {
        commit('SET_TOKEN', token);
        commit('SET_USER_ID', userID); 
        commit('SET_USER_DETAILS', response.utilisateur);
        return true;
      } else {
        throw new Error('Token non reçu du backend');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      commit('SET_TOKEN', null);
      commit('SET_USER_ID', null); 
      commit('SET_USER_DETAILS', null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userID'); 
      return false;
    }
  },
  async inscription({ commit }, userDetails) {
    try {
      const data = await utilisateurService.inscription(userDetails);
      commit('SET_USER_DETAILS', data);
      return true;
    } catch (error) {
      console.error('Erreur lors de l’inscription:', error);
      return false;
    }
  },
  logout({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_USER_ID', null); 
    commit('SET_USER_DETAILS', null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userID');
    commit('SET_MESSAGE', null);
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  async fetchUserDetails({ commit }, id_utilisateur) {
    try {
        const userDetails = await utilisateurService.getDetailsUtilisateur(id_utilisateur);
        commit('SET_USER_DETAILS', userDetails); 
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);

    }
  },
  verifyUserAuthentication({ state }) {
    console.log('Vérification de l\'authentification: ', state.token);
    return new Promise((resolve, reject) => {
      if (state.token && !isTokenExpired(state.token)) {
        console.log('Utilisateur authentifié avec token:', state.token);
        resolve();
      } else {
        console.log('Utilisateur non authentifié ou token expiré');
        reject('Utilisateur non authentifié');
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
