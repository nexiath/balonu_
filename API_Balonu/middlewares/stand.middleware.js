const jwt = require('jsonwebtoken');
const validator = require("validator");

function validateStandInput(req, res, next) {
    const { libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand } = req.body;
    if (!libelle_stand || !description_stand || !image_stand || !id_emplacement || !id_categorie_stand) {
        return res.status(400).send("Tous les champs du stand sont requis!");
    }
    if (!validator.isLength(libelle_stand, { min: 3 })) {
        return res.status(400).send("Le libellé du stand doit avoir au moins 3 caractères.");
    }
    next();
}

function validateAndAuthenticateStand(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Aucun token d'authentification fourni" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token d'authentification mal formaté" });
        }

        // Authentification
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id_utilisateur;

        // Validation des champs du stand
        const { libelle_stand, description_stand } = req.body;

        if (typeof libelle_stand === 'undefined' || !description_stand) {
            return res.status(400).send("Tous les champs du stand sont requis !");
        }

        if (!validator.isLength(libelle_stand, { min: 3 })) {
            return res.status(400).send("Le libellé du stand doit avoir au moins 3 caractères.");
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentification échouée : " + error.message });
    }
}

module.exports = {
    validateStandInput,
    validateAndAuthenticateStand
};
