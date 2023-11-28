const validator = require("validator");

exports.validateEmplacementInput = (req, res, next) => {
    const { libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre } = req.body;

    if (!libelle_emplacement || !capacite_emplacement || !caracteristique_emplacement || !point_eau_nombre || !prise_nombre) {
        return res.status(400).send("Tous les champs de l'emplacement sont requis!");
    }

    if (!validator.isLength(libelle_emplacement, { min: 3 })) {
        return res.status(400).send("Le libellé de l'emplacement doit avoir au moins 3 caractères.");
    }
    next();
};
