const express = require("express");
const router = express.Router();
const estController = require('../controllers/est.controller');
const estMiddleware = require('../middlewares/est.middleware');

/**
 * @swagger
 * tags:
 *   name: Est
 *   description: Opérations liées à la relation "est" entre montgolfières et couleurs
 */

/**
 * @swagger
 * /est:
 *   post:
 *     tags: [Est]
 *     summary: Créer une relation "est" entre une montgolfière et une couleur.
 *     description: Cette route permet de créer une nouvelle relation "est" entre une montgolfière et une couleur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstInput'
 *     responses:
 *       201:
 *         description: Relation "est" créée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post("/", estMiddleware.validateEstInput, estController.createEst);

/**
 * @swagger
 * /est:
 *   get:
 *     tags: [Est]
 *     summary: Récupérer toutes les relations "est" entre montgolfières et couleurs.
 *     description: Cette route permet de récupérer la liste de toutes les relations "est" entre montgolfières et couleurs.
 *     responses:
 *       200:
 *         description: La liste des relations "est" récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get("/", estController.getEst);

/**
 * @swagger
 * /est/montgolfieres/{id_montgolfiere}:
 *   get:
 *     tags: [Est]
 *     summary: Récupérer les relations "est" pour une montgolfière spécifique.
 *     description: Cette route permet de récupérer les relations "est" pour une montgolfière spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id_montgolfiere
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Les relations "est" pour la montgolfière spécifique récupérées avec succès.
 *       404:
 *         description: Montgolfière non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get("/montgolfieres/:id_montgolfiere", estController.getEstForMontgolfiere);

/**
 * @swagger
 * /est/couleurs/{id_couleur}:
 *   get:
 *     tags: [Est]
 *     summary: Récupérer les relations "est" pour une couleur spécifique.
 *     description: Cette route permet de récupérer les relations "est" pour une couleur spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id_couleur
 *         description: ID de la couleur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Les relations "est" pour la couleur spécifique récupérées avec succès.
 *       404:
 *         description: Couleur non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get("/couleurs/:id_couleur", estController.getEstForCouleur);

/**
 * @swagger
 * /est/{id_montgolfiere}/{id_couleur}:
 *   get:
 *     tags: [Est]
 *     summary: Récupérer une relation "est" spécifique entre une montgolfière et une couleur.
 *     description: Cette route permet de récupérer une relation "est" spécifique entre une montgolfière et une couleur en fonction de leurs IDs respectifs.
 *     parameters:
 *       - in: path
 *         name: id_montgolfiere
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_couleur
 *         description: ID de la couleur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La relation "est" spécifique récupérée avec succès.
 *       404:
 *         description: Relation "est" non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get("/:id_montgolfiere/:id_couleur", estController.getEstForMontgolfiereInCouleur);

module.exports = router;



