const validator = require('validator');

exports.validatePlanningInput = (req, res, next) => {
    const { date_debut, date_fin } = req.body;

    if (!date_debut || !date_fin) {
        return res.status(400).send("Veuillez fournir une date de début et une date de fin pour le planning.");
    }
    next();
};
