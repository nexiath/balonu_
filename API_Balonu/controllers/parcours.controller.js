const parcoursService = require('../services/parcours.service');

exports.createParcours = async (req, res) => {
    const { libelle_parcours, distance_parcours, duree_parcours } = req.body;
    try {
        const parcours = await parcoursService.createParcours(libelle_parcours, distance_parcours, duree_parcours);
        res.status(201).json(parcours);
    } catch (error) {
        console.error("Error in createParcours controller", error);
        res.status(500).send("Erreur interne lors de la création du parcours.");
    }
};

exports.getAllParcours = async (req, res) => {
    try {
        const parcoursList = await parcoursService.getAllParcours();
        res.status(200).json(parcoursList);
    } catch (error) {
        console.error("Error in getAllParcours controller", error);
        res.status(500).send("Erreur interne lors de la récupération des parcours.");
    }
};

exports.getParcoursById = async (req, res) => {
    const id = req.params.id;
    try {
        const parcours = await parcoursService.getParcoursById(id);
        if (!parcours) {
            res.status(404).send("Aucun parcours trouvé avec cet ID.");
        } else {
            res.status(200).json(parcours);
        }
    } catch (error) {
        console.error("Error in getParcoursById controller", error);
        res.status(500).send("Erreur interne lors de la récupération du parcours.");
    }
};

exports.updateParcours = async (req, res) => {
    const id = req.params.id;
    const { libelle_parcours, distance_parcours, duree_parcours } = req.body;
    try {
        const parcours = await parcoursService.updateParcours(id, libelle_parcours, distance_parcours, duree_parcours);
        if (!parcours) {
            res.status(404).send("Aucun parcours trouvé avec cet ID pour la mise à jour.");
        } else {
            res.status(200).json(parcours);
        }
    } catch (error) {
        console.error("Error in updateParcours controller", error);
        res.status(500).send("Erreur interne lors de la mise à jour du parcours.");
    }
};

exports.deleteParcours = async (req, res) => {
    const id = req.params.id;
    try {
        const rowCount = await parcoursService.deleteParcours(id);
        if (rowCount === 0) {
            res.status(404).send("Aucun parcours trouvé avec cet ID pour la suppression.");
        } else {
            res.status(200).send("Parcours supprimé avec succès.");
        }
    } catch (error) {
        console.error("Error in deleteParcours controller", error);
        res.status(500).send("Erreur interne lors de la suppression du parcours.");
    }
};
