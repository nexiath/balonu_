const validator = require("validator");

exports.validateVolInput = (req, res, next) => {
    const { prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning } = req.body;
    if (!prix_vol || !libelle_vol || !avis_vol || !id_montgolfiere || !id_parcours || !id_planning ) {
        return res.status(400).send("Tout les champs sont requis !");
    }
    if (!validator.isLength(libelle_vol, { min: 3 })) {
        return res.status(400).send("Le libellé du couleur doit avoir au moins 3 caractères.");
    }
    next();
};
