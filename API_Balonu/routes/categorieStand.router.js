const express = require("express");
const router = express.Router();
const categorieStandController = require('../controllers/categorieStand.controller');
const categorieStandMiddleware = require('../middlewares/categorieStand.middleware');

/**
 * @swagger
 * tags:
 *   name: CategorieStand
 *   description: Opérations liées aux catégories de stands
 */

/**
 * @swagger
 * /categorieStands:
 *   post:
 *     tags: [CategorieStand]
 *     summary: Créer une nouvelle catégorie de stand.
 *     description: Cette route permet de créer une nouvelle catégorie de stand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorieStandInput'
 *     responses:
 *       201:
 *         description: Catégorie de stand créée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', categorieStandMiddleware.validateStandInput, categorieStandController.createCategorieStand);

/**
 * @swagger
 * /categorieStands:
 *   get:
 *     tags: [CategorieStand]
 *     summary: Récupérer toutes les catégories de stands.
 *     description: Cette route permet de récupérer toutes les catégories de stands.
 *     responses:
 *       200:
 *         description: Liste des catégories de stands récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', categorieStandController.getAllCategories);

/**
 * @swagger
 * /categorieStands/{id_categorie_stand}:
 *   get:
 *     tags: [CategorieStand]
 *     summary: Récupérer une catégorie de stand spécifique par ID.
 *     description: Cette route permet de récupérer une catégorie de stand spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id_categorie_stand
 *         description: ID de la catégorie de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie de stand récupérée avec succès.
 *       404:
 *         description: Catégorie de stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id_categorie_stand', categorieStandController.getCategorieById);

/**
 * @swagger
 * /categorieStands/{id_categorie_stand}:
 *   put:
 *     tags: [CategorieStand]
 *     summary: Mettre à jour une catégorie de stand spécifique par ID.
 *     description: Cette route permet de mettre à jour une catégorie de stand spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id_categorie_stand
 *         description: ID de la catégorie de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorieStandInput'
 *     responses:
 *       200:
 *         description: Catégorie de stand mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Catégorie de stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id_categorie_stand', categorieStandMiddleware.validateStandInput, categorieStandController.updateCategorieStand);

/**
 * @swagger
 * /categorieStands/{id_categorie_stand}:
 *   delete:
 *     tags: [CategorieStand]
 *     summary: Supprimer une catégorie de stand spécifique par ID.
 *     description: Cette route permet de supprimer une catégorie de stand spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id_categorie_stand
 *         description: ID de la catégorie de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie de stand supprimée avec succès.
 *       404:
 *         description: Catégorie de stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id_categorie_stand', categorieStandController.deleteCategorieStand);

module.exports = router;

