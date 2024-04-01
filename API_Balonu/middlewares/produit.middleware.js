const validator = require("validator");
const emplacementService = require("../services/emplacement.service");

exports.validateProduitInput = (req, res, next) => {
    const { libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit } = req.body;

    if (!libelle_produit || !stock_produit || !prix_produit || !description_produit || !quantite_produit || !id_categorie || !image_produit) {
        return res.status(400).send("Tous les champs du produit sont requis!");
    }

    if (!validator.isLength(libelle_produit, { min: 3 })) {
        return res.status(400).send("Le libellé du produit doit avoir au moins 3 caractères.");
    }

    if (stock_produit < 0 || prix_produit < 0 || quantite_produit < 0) {
        return res.status(400).send("Les champs stock, prix, et quantité ne doivent pas être négatifs.");
    }
    next();
};
