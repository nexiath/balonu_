const express = require("express");
const router = express.Router();
const daterController = require('../controllers/dateReservation.controller');
const daterMiddleware = require('../middlewares/dateReservation.middleware');

router.post('/', daterMiddleware.validateReservationDateInput, daterController.createReservationDate);
router.get('/', daterController.getAllReservationDates);
router.get('/:id', daterController.getReservationDateById);
router.put('/:id', daterMiddleware.validateReservationDateInput, daterController.updateReservationDate);
router.delete('/:id', daterController.deleteReservationDate);

module.exports = router;
