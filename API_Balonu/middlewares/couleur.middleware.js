const validator = require("validator");

exports.validateCouleurInput = (req, res, next) => {
    const {libelle_couleur } = req.body;
    if (!libelle_couleur ) {
        return res.status(400).send("Le champ couleur est requis!");
    }
    if (!validator.isLength(libelle_couleur, { min: 3 })) {
        return res.status(400).send("Le libellé du couleur doit avoir au moins 3 caractères.");
    }
    next();
};
