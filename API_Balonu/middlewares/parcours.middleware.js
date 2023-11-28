const validator = require('validator');

exports.validateParcoursInput = (req, res, next) => {
    const { libelle_parcours, distance_parcours, duree_parcours } = req.body;

    if (!libelle_parcours || !distance_parcours || !duree_parcours) {
        return res.status(400).send("Veuillez fournir tous les détails du parcours.");
    }

    if (!validator.isLength(libelle_parcours, { min: 3 })) {
        return res.status(400).send("Le libellé du parcours doit contenir au moins 3 caractères.");
    }

    if (!validator.isNumeric(distance_parcours.toString())) {
        return res.status(400).send("La distance du parcours doit être un nombre.");
    }

    if (!validator.isLength(duree_parcours, { min: 3 })) {
        return res.status(400).send("La durée du parcours doit contenir au moins 3 caractères.");
    }

    next();
};
