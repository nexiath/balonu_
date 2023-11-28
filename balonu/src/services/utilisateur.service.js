import axiosMarche from '../services/axios.service';

export const utilisateurService = {
  async login(userCredentials) {
    try {
      const response = await axiosMarche.post('/utilisateurs/login', userCredentials);
    
      if (response.data.token) {
        localStorage.setItem('userID', response.data.utilisateur.id_utilisateur);
        localStorage.setItem('authToken', response.data.token);
      }

      return response.data; 
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Échec de la connexion');
    }
  },

  async getUsers() {
    try {
      const response = await axiosMarche.get('/utilisateurs');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw new Error('Impossible de récupérer les utilisateurs');
    }
  },

  async inscription(userDetails) {
    try {
      const response = await axiosMarche.post('/utilisateurs', userDetails);
      return response.data; 
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error('Échec de l\'inscription');
    }
  },
  async updateUserRole(id_utilisateur, id_role) {
    try {
      const response = await axiosMarche.put(`/utilisateurs/${id_utilisateur}/role`, { id_role });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      throw new Error('Échec de la mise à jour du rôle');
    }
  },

  async getDetailsUtilisateur(id_utilisateur) {
    try {
      const response = await axiosMarche.get(`/utilisateurs/${id_utilisateur}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
      throw new Error('Impossible de récupérer les détails de l’utilisateur');
    }
  },

  logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('authToken');
  }
};


axiosMarche.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default utilisateurService;
