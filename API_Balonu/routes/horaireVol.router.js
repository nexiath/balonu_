const express = require("express");
const router = express.Router();
const horaireVolController = require('../controllers/horaireVol.controller');
const horaireVolMiddleware = require('../middlewares/horaireVol.middleware');

/**
 * @swagger
 * tags:
 *   name: HoraireVol
 *   description: Opérations liées aux horaires de vol
 */

/**
 * @swagger
 * /horaires:
 *   post:
 *     tags: [HoraireVol]
 *     summary: Créer un horaire de vol.
 *     description: Cette route permet de créer un nouvel horaire de vol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HoraireVolInput'
 *     responses:
 *       201:
 *         description: Horaire de vol créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', horaireVolMiddleware.validateHoraireVolInput, horaireVolController.createHoraireVol);

/**
 * @swagger
 * /horaires:
 *   get:
 *     tags: [HoraireVol]
 *     summary: Récupérer tous les horaires de vol.
 *     description: Cette route permet de récupérer la liste de tous les horaires de vol.
 *     responses:
 *       200:
 *         description: La liste des horaires de vol récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', horaireVolController.getHorairesVol);

/**
 * @swagger
 * /horaires/{id}:
 *   get:
 *     tags: [HoraireVol]
 *     summary: Récupérer un horaire de vol par ID.
 *     description: Cette route permet de récupérer un horaire de vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'horaire de vol.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: L'horaire de vol récupéré avec succès.
 *       404:
 *         description: Horaire de vol non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', horaireVolController.getHoraireVolById);

/**
 * @swagger
 * /horaires/{id_horaire_vol}:
 *   put:
 *     tags: [HoraireVol]
 *     summary: Mettre à jour un horaire de vol par ID.
 *     description: Cette route permet de mettre à jour un horaire de vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id_horaire_vol
 *         description: ID de l'horaire de vol.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HoraireVolInput'
 *     responses:
 *       200:
 *         description: Horaire de vol mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Horaire de vol non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id_horaire_vol', horaireVolMiddleware.validateHoraireVolInput, horaireVolController.updateHoraireVol);

/**
 * @swagger
 * /horaires/{id}:
 *   delete:
 *     tags: [HoraireVol]
 *     summary: Supprimer un horaire de vol par ID.
 *     description: Cette route permet de supprimer un horaire de vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'horaire de vol.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Horaire de vol supprimé avec succès.
 *       404:
 *         description: Horaire de vol non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', horaireVolController.deleteHoraireVol);

module.exports = router;

