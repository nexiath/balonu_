import axios from './axios.service';

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

  async createStand(libelle_stand, description_stand, image_stand,id_emplacement) {
    try {
      const response = await axios.post('/stands', {
        libelle_stand,
        description_stand,
        image_stand,
        id_emplacement,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du stand:', error);
      throw new Error('Échec de la création du stand');
    }
  },

  async updateStand(id_stand, libelle_stand, description_stand, image_stand,id_emplacement) {
    try {
      const response = await axios.put(`/stands/${id_stand}`, {
        libelle_stand,
        description_stand,
        image_stand,
        id_emplacement,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stand:', error);
      throw new Error('Échec de la mise à jour du stand');
    }
  },

  async deleteStand(id) {
    try {
      const response = await axios.delete(`/stands/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du stand:', error);
      throw new Error('Échec de la suppression du stand');
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
};

export default standService;
