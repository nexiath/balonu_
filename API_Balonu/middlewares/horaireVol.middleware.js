const validator = require("validator");

exports.validateHoraireVolInput = (req, res, next) => {
    const { date_vol, horaire_vol } = req.body;

    if (!date_vol || !horaire_vol) {
        return res.status(400).send("La date et l'horaire du vol sont requis!");
    }
    if (!validator.isISO8601(date_vol)) {
        return res.status(400).send("Format de date invalide. Utilisez le format ISO8601.");
    }
    next();
};
