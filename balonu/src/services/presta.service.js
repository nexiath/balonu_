import axios from 'axios';

export async function updateDescription(prestataireId, updatedDescription) {
  try {
    await axios.put(`http://localhost:3030/presta/description/${prestataireId}`, {
      editeur_wysiwyg: updatedDescription,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la description:', error);
    throw new Error('Erreur lors de la mise à jour de la description');
  }
}

export async function updateProfilePhoto(prestataireId, updatedProfilePhoto) {
  try {
    await axios.put(`http://localhost:3030/presta/photo/${prestataireId}`, {
      photo_profil: updatedProfilePhoto,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la Photo de Profil:', error);
    throw new Error('Erreur lors de la mise à jour de la Photo de Profil');
  }
}

const PrestaService = {
  async incrementVisitors(prestaId, currentVisitors) {
    try {
      await axios.put(`http://localhost:3030/presta/${prestaId}/visite`, { nombre_visiteurs: currentVisitors });
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des visiteurs :', error);
      return false;
    }
  },
};

export async function isLivreDOrActivated(prestataireId) {
  try {
    const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
    const prestataire = response.data;
    const servicesActivables = prestataire.services_activables;
    const isActivated = servicesActivables && servicesActivables['Livre d\'or'];
    return isActivated; 
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du prestataire:', error);
    return false;
  }
}

export async function isStandsActivated(prestataireId) {
  try {
    const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
    const prestataire = response.data;
    const servicesActivables = prestataire.services_activables;
    const isActivated = servicesActivables && servicesActivables['Les Stands'];
    return isActivated; 
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du prestataire:', error);
    return false;
  }
}

export async function isMontgolfieresActivated(prestataireId) {
  try {
    const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
    const prestataire = response.data;
    const servicesActivables = prestataire.services_activables;
    const isActivated = servicesActivables && servicesActivables['Les Montgolfières'];
    return isActivated; 
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du prestataire:', error);
    return false;
  }
}

export async function isComptageDeVisiteursActivated(prestataireId) {
  try {
    const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
    const prestataire = response.data;
    const servicesActivables = prestataire.services_activables;
    const isActivated = servicesActivables && servicesActivables['Comptage de visiteurs'];
    return isActivated;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du prestataire:', error);
    return false;
  }
}




export default PrestaService;

