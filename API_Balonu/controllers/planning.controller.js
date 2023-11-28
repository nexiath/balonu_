const planningService = require('../services/planning.service');

exports.createPlanning = async (req, res) => {
    const { date_debut, date_fin } = req.body;
    try {
        const planningId = await planningService.createPlanning(date_debut, date_fin);
        res.status(201).send({ id: planningId, message: 'Planning créé avec succès.' });
    } catch (error) {
        res.status(500).send("Erreur interne lors de la création du planning.");
    }
};

exports.getAllPlannings = async (req, res) => {
    try {
        const plannings = await planningService.getAllPlannings();
        res.status(200).json(plannings);
    } catch (error) {
        res.status(500).send("Erreur interne lors de la récupération des plannings.");
    }
};

exports.getPlanningById = async (req, res) => {
    const id = req.params.id;
    try {
        const planning = await planningService.getPlanningById(id);
        if (!planning) {
            res.status(404).send("Planning non trouvé.");
        } else {
            res.status(200).json(planning);
        }
    } catch (error) {
        res.status(500).send("Erreur interne lors de la récupération du planning.");
    }
};

exports.updatePlanning = async (req, res) => {
    const id = req.params.id;
    const { date_debut, date_fin } = req.body;
    try {
        const updatedPlanning = await planningService.updatePlanning(id, date_debut, date_fin);
        res.status(200).json(updatedPlanning);
    } catch (error) {
        res.status(500).send("Erreur interne lors de la mise à jour du planning.");
    }
};

exports.deletePlanning = async (req, res) => {
    const id = req.params.id;
    try {
        await planningService.deletePlanning(id);
        res.status(200).send("Planning supprimé avec succès.");
    } catch (error) {
        res.status(500).send("Erreur interne lors de la suppression du planning.");
    }
};
