const PlanningModel = require('../services/planning.service');

// Créer un planning
async function creerPlanning(req, res) {
    try {
        const { dateDebut, dateFin } = req.body;
        const planning = await PlanningModel.creerPlanning(dateDebut, dateFin);
        res.status(201).json(planning);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du planning' });
    }
}

// Obtenir un planning par son ID
async function obtenirPlanning(req, res) {
    try {
        const id = req.params.id;
        const planning = await PlanningModel.obtenirPlanning(id);
        if (!planning) {
            return res.status(404).json({ message: 'Planning non trouvé' });
        }
        res.status(200).json(planning);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du planning' });
    }
}

// Mettre à jour un planning
async function mettreAJourPlanning(req, res) {
    try {
        const id = req.params.id;
        const { dateDebut, dateFin } = req.body;
        const planning = await PlanningModel.mettreAJourPlanning(id, dateDebut, dateFin);
        if (!planning) {
            return res.status(404).json({ message: 'Planning non trouvé' });
        }
        res.status(200).json(planning);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du planning' });
    }
}

// Supprimer un planning
async function supprimerPlanning(req, res) {
    try {
        const id = req.params.id;
        await PlanningModel.supprimerPlanning(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du planning' });
    }
}


async function getPlanningForWeek(req, res) {
    try {
        const dateDebutSemaine = new Date(req.query.date); // Ou utilisez un autre moyen pour obtenir la date
        const planning = await PlanningModel.getPlanningForWeek(dateDebutSemaine);
        res.json(planning);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    creerPlanning,
    obtenirPlanning,
    mettreAJourPlanning,
    supprimerPlanning,
    getPlanningForWeek
};
