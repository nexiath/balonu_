const prestataireService = require('../services/presta.service');
const path = require('path');

async function getPrestataires(req, res) {
    try {
        const prestataires = await prestataireService.getPrestataires();
        res.json(prestataires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPrestataireByID(req, res) {
    const prestataireId = req.params.id;
    try {
        const prestataire = await prestataireService.getPrestataireByID(prestataireId);
        if (!prestataire) {
            return res.status(404).json({ message: "Prestataire introuvable" });
        }
        res.json(prestataire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deletePrestataire(req, res) {
    const prestataireId = req.params.id;
    try {
        await prestataireService.deletePrestataire(prestataireId);
        res.json({ message: "Prestataire supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPrestatairesByUserId(req, res) {
    const userId = req.params.userId;
    try {
        const prestataires = await prestataireService.getPrestatairesByUserId(userId);
        res.json(prestataires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateDescription(req, res) {
    const prestataireId = req.params.id;
    const { editeur_wysiwyg } = req.body;
    try {
        const updatedPrestataire = await prestataireService.updateDescription(prestataireId, editeur_wysiwyg);
        res.json(updatedPrestataire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 
async function updateProfilePhoto(req, res) {
    const prestataireId = req.params.id;
    const { photo_profil } = req.body;
    try {
        const updatedPrestataire = await prestataireService.updateProfile(prestataireId, photo_profil);
        res.json(updatedPrestataire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getServiceVisibility(req, res, next) {
    try {
      const { id_presta, serviceKey } = req.params;
      const visibility = await prestataireService.getServiceVisibility(id_presta, serviceKey);
      res.json({ activated: visibility });
    } catch (error) {
      console.error('Erreur pendant le getServiceVisibility:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function toggleServiceVisibility(req, res, next) {
    try {
      const { id_presta, serviceKey } = req.params;
      const newVisibility = await prestataireService.toggleServiceVisibility(id_presta, serviceKey);
      res.json({ activated: newVisibility });
    } catch (error) {
      console.error('Erreur pendant le : toggleServiceVisibility', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


module.exports = {
    getPrestataires,
    getPrestataireByID,
    deletePrestataire,
    getPrestatairesByUserId,
    updateDescription,
    updateProfilePhoto,
    getServiceVisibility,
    toggleServiceVisibility,
};
