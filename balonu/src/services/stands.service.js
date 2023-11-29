import axios from './axios.service';

const getStandsUtilisateurFromLocalStorage = () => {
  const standsUtilisateur = localStorage.getItem('standsUtilisateur');
  return standsUtilisateur ? JSON.parse(standsUtilisateur) : [];
};

const updateStandUtilisateurInLocalStorage = async (id_utilisateur) => {
  try {
      const response = await axios.get(`/stands/utilisateurs/${id_utilisateur}`);
      localStorage.setItem('standsUtilisateur', JSON.stringify(response.data));
  } catch (error) {
      console.error('Erreur lors de la mise à jour des montgolfières de l\'utilisateur:', error);
      throw error; 
  }
};


const standService = {

  async getAllStands() {
    try {
      const response = await axios.get('/stands');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les stands:', error);
      throw new Error('Impossible de récupérer tous les stands');
    }
  },
  async getStandById(id) {
    try {
      const response = await axios.get(`/stands/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du stand par ID:', error);
      throw new Error('Impossible de récupérer le stand par ID');
    }
  },

  // async createStand(libelle_stand, description_stand, image_stand,id_emplacement,id_categorie_stand) {
  //   try {
  //     const response = await axios.post('/stands', {
  //       libelle_stand,
  //       description_stand,
  //       image_stand,
  //       id_emplacement,
  //       id_categorie_stand
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Erreur lors de la création du stand:', error);
  //     throw new Error('Échec de la création du stand');
  //   }
  // },

  async createStand(data, id_utilisateur) {
    try {
        const response = await axios.post('/stands', data);
        await updateStandUtilisateurInLocalStorage(id_utilisateur);
        return response;
    } catch (error) {
        console.error('Erreur lors de la création du stand:', error);
        throw new Error('Échec de la création du stand');
    }
},

  // async updateStand(id_stand, libelle_stand, description_stand, image_stand,id_emplacement,id_categorie_stand) {
  //   try {
  //     const response = await axios.put(`/stands/${id_stand}`, {
  //       libelle_stand,
  //       description_stand,
  //       image_stand,
  //       id_emplacement,
  //       id_categorie_stand
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour du stand:', error);
  //     throw new Error('Échec de la mise à jour du stand');
  //   }
  // },
  async updateStand(id, data, id_utilisateur) {
    try {
        const response = await axios.put(`/stands/${id}`, data);
        await updateStandUtilisateurInLocalStorage(id_utilisateur);
        return response;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du Stand avec l'ID ${id}:`, error);
        throw error;
    }
},

  // async deleteStand(id) {
  //   try {
  //     const response = await axios.delete(`/stands/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression du stand:', error);
  //     throw new Error('Échec de la suppression du stand');
  //   }
  // },
  async deleteStand(id, id_utilisateur) {
    try {
        const response = await axios.delete(`/stands/${id}`);
        await updateStandUtilisateurInLocalStorage(id_utilisateur);
        return response;
    } catch (error) {
        console.error(`Erreur lors de la suppression du Stand avec l'ID ${id}:`, error);
        throw error;
    }
},

  async getStandsByIdEmplacement(id_emplacement) {
    try {
      const response = await axios.get(`/stands/emplacement/${id_emplacement}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des stands par ID d\'emplacement:', error);
      throw new Error('Impossible de récupérer les stands par ID d\'emplacement');
    }
  },

  async getStandsUtilisateur(id_utilisateur) {
    try {
        const response = await axios.get(`/stands/utilisateurs/${id_utilisateur}`);
        localStorage.setItem('standsUtilisateur', JSON.stringify(response.data));
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des stands de l\'utilisateur:', error);
        throw error;
    }
},
};
export { getStandsUtilisateurFromLocalStorage, updateStandUtilisateurInLocalStorage };
export default standService;
