import axiosMarche from './axios.service';

// Function to get montgolfières of a user from local storage
const getMontgolfieresUtilisateurFromLocalStorage = () => {
    const montgolfieresUtilisateur = localStorage.getItem('montgolfieresUtilisateur');
    return montgolfieresUtilisateur ? JSON.parse(montgolfieresUtilisateur) : [];
};

// Function to update the user's montgolfières in local storage
const updateMontgolfieresUtilisateurInLocalStorage = async (id_utilisateur) => {
    try {
        const response = await axiosMarche.get(`/montgolfieres/utilisateurs/${id_utilisateur}`);
        localStorage.setItem('montgolfieresUtilisateur', JSON.stringify(response.data));
    } catch (error) {
        console.error('Erreur lors de la mise à jour des montgolfières de l\'utilisateur:', error);
        throw error; 
    }
};

const montgolfiereService = {
    async createMontgolfiere(data, id_utilisateur) {
        try {
            const response = await axiosMarche.post('/montgolfieres', data);
            await updateMontgolfieresUtilisateurInLocalStorage(id_utilisateur);
            return response;
        } catch (error) {
            console.error('Erreur lors de la création de la montgolfière:', error);
            throw new Error('Échec de la création de la montgolfière');
        }
    },
    async getMontgolfieres() {
        try {
            const response = await axiosMarche.get('/montgolfieres');
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des montgolfières:', error);
            throw error;
        }
    },
    async getMontgolfiereById(id) {
        try {
            const response = await axiosMarche.get(`/montgolfieres/${id}`);
            return response;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la montgolfière avec l'ID ${id}:`, error);
            throw error;
        }
    },
    async updateMontgolfiere(id, data, id_utilisateur) {
        try {
            const response = await axiosMarche.put(`/montgolfieres/${id}`, data);
            await updateMontgolfieresUtilisateurInLocalStorage(id_utilisateur);
            return response;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la montgolfière avec l'ID ${id}:`, error);
            throw error;
        }
    },
    async deleteMontgolfiere(id, id_utilisateur) {
        try {
            const response = await axiosMarche.delete(`/montgolfieres/${id}`);
            await updateMontgolfieresUtilisateurInLocalStorage(id_utilisateur);
            return response;
        } catch (error) {
            console.error(`Erreur lors de la suppression de la montgolfière avec l'ID ${id}:`, error);
            throw error;
        }
    },
    async getMontgolfieresUtilisateur(id_utilisateur) {
        try {
            const response = await axiosMarche.get(`/montgolfieres/utilisateurs/${id_utilisateur}`);
            localStorage.setItem('montgolfieresUtilisateur', JSON.stringify(response.data));
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des montgolfières de l\'utilisateur:', error);
            throw error;
        }
    },
};

export { getMontgolfieresUtilisateurFromLocalStorage, updateMontgolfieresUtilisateurInLocalStorage };
export default montgolfiereService;
