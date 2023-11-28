const validator = require("validator");
const standService = require("../services/stand.service");

exports.validateStandInput = (req, res, next) => {
    const { libelle_categorie_stand  } = req.body;
    if (!libelle_categorie_stand ) {
        return res.status(400).send("Tous les champs du stand sont requis!");
    }
    if (!validator.isLength(libelle_categorie_stand, { min: 3 })) {
        return res.status(400).send("Le libellé du stand doit avoir au moins 3 caractères.");
    }
    next();
};
