const couleurService = require('../services/couleur.service');

exports.createCouleur = async (req, res) => {
    const { libelle_couleur } = req.body;
    try {
        const couleurId = await couleurService.createCouleur(libelle_couleur);
        res.status(201).send({ id: couleurId, message: 'Couleur créée avec succès.' });
    } catch (error) {
        res.status(500).send("Erreur interne lors de la création de la couleur.");
    }
};

exports.getAllCouleurs = async (req, res) => {
    try {
        const couleurs = await couleurService.getAllCouleurs();
        res.status(200).json(couleurs);
    } catch (error) {
        res.status(500).send("Erreur interne lors de la récupération des couleurs.");
    }
};

exports.getCouleurById = async (req, res) => {
    const id = req.params.id;
    try {
        const couleur = await couleurService.getCouleurById(id);
        if (!couleur) {
            res.status(404).send("Couleur non trouvée.");
        } else {
            res.status(200).json(couleur);
        }
    } catch (error) {
        res.status(500).send("Erreur interne lors de la récupération de la couleur.");
    }
};

exports.updateCouleur = async (req, res) => {
    const id = req.params.id;
    const { libelle_couleur } = req.body;
    try {
        const updatedCouleur = await couleurService.updateCouleur(id, libelle_couleur);
        res.status(200).json(updatedCouleur);
    } catch (error) {
        res.status(500).send("Erreur interne lors de la mise à jour de la couleur.");
    }
};

exports.deleteCouleur = async (req, res) => {
    const id = req.params.id;
    try {
        await couleurService.deleteCouleur(id);
        res.status(200).send("Couleur supprimée avec succès.");
    } catch (error) {
        res.status(500).send("Erreur interne lors de la suppression de la couleur.");
    }
};
