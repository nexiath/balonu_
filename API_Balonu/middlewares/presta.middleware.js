const prestataireService = require('../services/presta.service');

exports.checkPrestataireExistence = async (req, res, next) => {
    try {
        const prestataireId = req.params.id; 
        const exists = await prestataireService.checkPrestataireExists(prestataireId);
        if (!exists) {
            return res.status(404).json({ message: "Prestataire introuvable" });
        }
        next();
    } catch (error) {
        console.error("Erreur lors de la vérification de l'existence du prestataire:", error);
        return res.status(500).json({ message: "Erreur interne lors de la vérification de l'existence du prestataire" });
    }
};
