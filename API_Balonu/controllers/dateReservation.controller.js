const daterService = require("../services/dateReservation.service");

exports.createReservationDate = async (req, res) => {
    const { date_reservation } = req.body;
    try {
        const reservationDate = await daterService.createReservationDate(date_reservation);
        res.status(201).json(reservationDate);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getAllReservationDates = async (req, res) => {
    try {
        const reservationDates = await daterService.getAllReservationDates();
        res.status(200).json(reservationDates);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getReservationDateById = async (req, res) => {
    const id = req.params.id;
    try {
        const reservationDate = await daterService.getReservationDateById(id);
        if (!reservationDate) {
            res.status(404).send("Date de réservation non trouvée");
        } else {
            res.status(200).json(reservationDate);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.updateReservationDate = async (req, res) => {
    const id = req.params.id;
    const { date_reservation } = req.body;
    try {
        const updatedReservationDate = await daterService.updateReservationDate(id, date_reservation);
        if (!updatedReservationDate) {
            res.status(404).send("Date de réservation non trouvée");
        } else {
            res.status(200).json(updatedReservationDate);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.deleteReservationDate = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedReservationDate = await daterService.deleteReservationDate(id);
        if (!deletedReservationDate) {
            res.status(404).send("Date de réservation non trouvée");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};
