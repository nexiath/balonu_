const jwt = require('jsonwebtoken');
const validator = require("validator");

function validateAndAuthenticateMontgolfiere(req, res, next) {
    try {
        // Vérification de la présence du token
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

        // Validation des champs de montgolfière
        const { nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active } = req.body;

        if (typeof nombre_place === 'undefined' || !libelle_montgolfiere) {
            return res.status(400).send("Les champs 'nombre_place' et 'libelle_montgolfiere' sont requis!");
        }

        if (!validator.isInt(String(nombre_place), { min: 1 })) {
            return res.status(400).send("Le nombre de places doit être un entier positif.");
        }

        if (!validator.isLength(libelle_montgolfiere, { min: 3 })) {
            return res.status(400).send("Le libellé de la montgolfière doit avoir au moins 3 caractères.");
        }

        // Ajouter ici d'autres validations si nécessaire

        next();
    } catch (error) {
        res.status(401).json({ message: "Authentification échouée : " + error.message });
    }
}

module.exports = validateAndAuthenticateMontgolfiere;
