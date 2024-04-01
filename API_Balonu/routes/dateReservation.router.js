const express = require("express");
const router = express.Router();
const daterController = require('../controllers/dateReservation.controller');
const daterMiddleware = require('../middlewares/dateReservation.middleware');

/**
 * @swagger
 * tags:
 *   name: DateReservation
 *   description: Opérations liées aux dates de réservation
 */

/**
 * @swagger
 * /datesReservations:
 *   post:
 *     tags: [DateReservation]
 *     summary: Créer une nouvelle date de réservation.
 *     description: Cette route permet de créer une nouvelle date de réservation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationDateInput'
 *     responses:
 *       201:
 *         description: Date de réservation créée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', daterMiddleware.validateReservationDateInput, daterController.createReservationDate);

/**
 * @swagger
 * /datesReservations:
 *   get:
 *     tags: [DateReservation]
 *     summary: Récupérer la liste de toutes les dates de réservation.
 *     description: Cette route permet de récupérer la liste de toutes les dates de réservation.
 *     responses:
 *       200:
 *         description: Liste de toutes les dates de réservation récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', daterController.getAllReservationDates);

/**
 * @swagger
 * /datesReservations/{id}:
 *   get:
 *     tags: [DateReservation]
 *     summary: Récupérer une date de réservation spécifique par ID.
 *     description: Cette route permet de récupérer une date de réservation spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la date de réservation.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Date de réservation récupérée avec succès.
 *       404:
 *         description: Date de réservation non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', daterController.getReservationDateById);

/**
 * @swagger
 * /datesReservations/{id}:
 *   put:
 *     tags: [DateReservation]
 *     summary: Mettre à jour une date de réservation existante.
 *     description: Cette route permet de mettre à jour une date de réservation existante en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la date de réservation.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationDateInput'
 *     responses:
 *       200:
 *         description: Date de réservation mise à jour avec succès.
 *       404:
 *         description: Date de réservation non trouvée.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', daterMiddleware.validateReservationDateInput, daterController.updateReservationDate);

/**
 * @swagger
 * /datesReservations/{id}:
 *   delete:
 *     tags: [DateReservation]
 *     summary: Supprimer une date de réservation existante.
 *     description: Cette route permet de supprimer une date de réservation existante en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la date de réservation.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Date de réservation supprimée avec succès.
 *       404:
 *         description: Date de réservation non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', daterController.deleteReservationDate);

module.exports = router;

