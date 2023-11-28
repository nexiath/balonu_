const validator = require("validator");

exports.validateReservationDateInput = (req, res, next) => {
    const { date_reservation } = req.body;

    if (!date_reservation) {
        return res.status(400).send("La date de réservation est requise!");
    }
    next();
};
