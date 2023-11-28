const validator = require('validator');

exports.validateAffectationStandInput = (req, res, next) => {
    const { id_utilisateur, id_stand } = req.body;

    if (!id_utilisateur || !id_stand) {
        return res.status(400).send('Tous les champs de l\'affectation stand sont requis!');
    }
    next();
};

exports.validateVenteInput = (req, res, next) => {
    const { id_stand, id_produit } = req.body;

    if (!id_stand || !id_produit) {
        return res.status(400).send('Tous les champs de la vente sont requis!');
    }
    next();
};

exports.validateAffectationMontgolfiereInput = (req, res, next) => {
    const { id_utilisateur, id_montgolfiere } = req.body;

    if (!id_utilisateur || !id_montgolfiere) {
        return res.status(400).send('Tous les champs de l\'affectation montgolfière sont requis!');
    }
    next();
};

exports.validateAffectationVolInput = (req, res, next) => {
    const { id_utilisateur, id_vol } = req.body;

    if (!id_utilisateur || !id_vol) {
        return res.status(400).send('Tous les champs de l\'affectation vol sont requis!');
    }
    next();
};

exports.validateReservationEmplacementInput = (req, res, next) => {
    const { id_utilisateur, id_stand, id_emplacement, id_date_reservation } = req.body;

    if (!id_utilisateur || !id_stand || !id_emplacement || !id_date_reservation) {
        return res.status(400).send('Tous les champs de la réservation d\'emplacement sont requis!');
    }
    next();
};


exports.validateAffectationVolInput = (req, res, next) => {
    const { id_utilisateur, id_vol } = req.body;
    if (!id_utilisateur || !id_vol) {
        return res.status(400).send('Tous les champs de l\'affectation vol sont requis!');
    }
    next();
};

exports.validateReservationEmplacementInput = (req, res, next) => {
    const { id_utilisateur, id_stand, id_emplacement, id_date_reservation } = req.body;
    if (!id_utilisateur || !id_stand || !id_emplacement || !id_date_reservation) {
        return res.status(400).send('Tous les champs de la réservation emplacement sont requis!');
    }
    next();
};