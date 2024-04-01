const express = require("express");
const router = express.Router();
const emplacementController = require('../controllers/emplacement.controller');
const emplacementMiddleware = require('../middlewares/emplacement.middleware');


/**
 * @swagger
 * tags:
 *   name: Emplacement
 *   description: Opérations liées aux emplacements
 */

/**
 * @swagger
 * /emplacement/withoutstand:
 *   get:
 *     tags: [Emplacement]
 *     summary: Récupérer les emplacements sans stand associé.
 *     description: Cette route permet de récupérer la liste des emplacements sans stand associé.
 *     responses:
 *       200:
 *         description: Liste des emplacements sans stand récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/withoutstand', emplacementController.getEmplacementsWithoutStand);

/**
 * @swagger
 * /emplacements:
 *   post:
 *     tags: [Emplacement]
 *     summary: Créer un nouvel emplacement.
 *     description: Cette route permet de créer un nouvel emplacement.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmplacementInput'
 *     responses:
 *       201:
 *         description: Emplacement créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', emplacementMiddleware.validateEmplacementInput, emplacementController.createEmplacement);

/**
 * @swagger
 * /emplacements:
 *   get:
 *     tags: [Emplacement]
 *     summary: Récupérer la liste de tous les emplacements.
 *     description: Cette route permet de récupérer la liste de tous les emplacements.
 *     responses:
 *       200:
 *         description: Liste de tous les emplacements récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', emplacementController.getAllEmplacements);

/**
 * @swagger
 * /emplacements/{id}:
 *   get:
 *     tags: [Emplacement]
 *     summary: Récupérer un emplacement spécifique par ID.
 *     description: Cette route permet de récupérer un emplacement spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'emplacement.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Emplacement récupéré avec succès.
 *       404:
 *         description: Emplacement non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', emplacementController.getEmplacementById);

/**
 * @swagger
 * /emplacements/{id}:
 *   put:
 *     tags: [Emplacement]
 *     summary: Mettre à jour un emplacement existant.
 *     description: Cette route permet de mettre à jour un emplacement existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'emplacement.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmplacementInput'
 *     responses:
 *       200:
 *         description: Emplacement mis à jour avec succès.
 *       404:
 *         description: Emplacement non trouvé.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', emplacementMiddleware.validateEmplacementInput, emplacementController.updateEmplacement);

/**
 * @swagger
 * /emplacements/{id}:
 *   delete:
 *     tags: [Emplacement]
 *     summary: Supprimer un emplacement existant.
 *     description: Cette route permet de supprimer un emplacement existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'emplacement.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Emplacement supprimé avec succès.
 *       404:
 *         description: Emplacement non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', emplacementController.deleteEmplacement);

module.exports = router;

