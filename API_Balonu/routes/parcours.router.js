const express = require("express");
const router = express.Router();
const parcoursController = require('../controllers/parcours.controller');
const parcoursMiddleware = require('../middlewares/parcours.middleware');


/**
 * @swagger
 * tags:
 *   name: Parcours
 *   description: Opérations liées aux parcours
 */

/**
 * @swagger
 * /parcours:
 *   post:
 *     tags: [Parcours]
 *     summary: Créer un parcours.
 *     description: Cette route permet de créer un nouveau parcours.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParcoursInput'
 *     responses:
 *       201:
 *         description: Parcours créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', parcoursMiddleware.validateParcoursInput, parcoursController.createParcours);

/**
 * @swagger
 * /parcours:
 *   get:
 *     tags: [Parcours]
 *     summary: Récupérer tous les parcours.
 *     description: Cette route permet de récupérer la liste de tous les parcours.
 *     responses:
 *       200:
 *         description: La liste des parcours récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', parcoursController.getAllParcours);

/**
 * @swagger
 * /parcours/{id}:
 *   get:
 *     tags: [Parcours]
 *     summary: Récupérer un parcours par ID.
 *     description: Cette route permet de récupérer un parcours en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du parcours.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le parcours récupéré avec succès.
 *       404:
 *         description: Parcours non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', parcoursController.getParcoursById);

/**
 * @swagger
 * /parcours/{id}:
 *   put:
 *     tags: [Parcours]
 *     summary: Mettre à jour un parcours par ID.
 *     description: Cette route permet de mettre à jour un parcours en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du parcours.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParcoursInput'
 *     responses:
 *       200:
 *         description: Parcours mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Parcours non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', parcoursMiddleware.validateParcoursInput, parcoursController.updateParcours);

/**
 * @swagger
 * /parcours/{id}:
 *   delete:
 *     tags: [Parcours]
 *     summary: Supprimer un parcours par ID.
 *     description: Cette route permet de supprimer un parcours en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du parcours.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Parcours supprimé avec succès.
 *       404:
 *         description: Parcours non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', parcoursController.deleteParcours);

module.exports = router;

