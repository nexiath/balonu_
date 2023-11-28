const validator = require("validator");

exports.validateUserInput = (req, res, next) => {
    const { nom_utilisateur, prenom_utilisateur, mot_de_passe_utilisateur } = req.body;
    if (!nom_utilisateur || !prenom_utilisateur) {
        return res.status(400).send("Le nom ou le prénom est manquant !");
    }
    if (!validator.isLength(nom_utilisateur, { min: 3 }) || 
        !validator.isAlpha(nom_utilisateur, 'fr-FR', { ignore: ' ' })) {
        return res.status(400).send("Format incorrect pour le nom !");
    }
    if (!validator.isLength(prenom_utilisateur, { min: 3 }) || 
        !validator.isAlpha(prenom_utilisateur, 'fr-FR', { ignore: ' ' })) {
        return res.status(400).send("Format incorrect pour le prénom !");
    }
    if (!validator.isLength(mot_de_passe_utilisateur, { min: 6 })) {
        return res.status(400).json({ error: "Le mot de passe doit comporter au moins 6 caractères !" });
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const { login_utilisateur, mot_de_passe_utilisateur } = req.body;
    if (!login_utilisateur || !mot_de_passe_utilisateur) {
        return res.status(400).json({ error: "Le login ou le mot de passe est manquant !" });
    }
    if (!validator.isLength(login_utilisateur, { min: 3 }) || !validator.isAlphanumeric(login_utilisateur)) {
        return res.status(400).json({ error: "Format incorrect pour le login !" });
    }
    next();
};
