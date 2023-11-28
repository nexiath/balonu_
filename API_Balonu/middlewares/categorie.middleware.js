const validator = require("validator");
const emplacementService = require("../services/categorie.service");

exports.validateCategorieInput = (req, res, next) => {
    const { libelle_categorie, description_categorie } = req.body;

    // Vérifier si tous les champs de la catégorie sont requis
    if (!libelle_categorie || !description_categorie) {
        return res.status(400).send("Tous les champs de la catégorie sont requis!");
    }

    // Vérifier la longueur du libellé de la catégorie
    if (!validator.isLength(libelle_categorie, { min: 3 })) {
        return res.status(400).send("Le libellé de la catégorie doit avoir au moins 3 caractères.");
    }
    next();
};
