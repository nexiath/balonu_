const express = require("express");
const router = express.Router();
const categorieController = require('../controllers/categorie.controller');
const categorieMiddleware = require('../middlewares/categorie.middleware');

/**
 * @swagger
 * tags:
 *   name: Categorie
 *   description: Opérations liées aux catégories
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categorie]
 *     summary: Créer une nouvelle catégorie.
 *     description: Cette route permet de créer une nouvelle catégorie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorieInput'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', categorieMiddleware.validateCategorieInput, categorieController.createCategorie);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categorie]
 *     summary: Récupérer toutes les catégories.
 *     description: Cette route permet de récupérer toutes les catégories.
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', categorieController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categorie]
 *     summary: Récupérer une catégorie spécifique par ID.
 *     description: Cette route permet de récupérer une catégorie spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la catégorie.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', categorieController.getCategorieById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categorie]
 *     summary: Mettre à jour une catégorie spécifique par ID.
 *     description: Cette route permet de mettre à jour une catégorie spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la catégorie.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorieInput'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Catégorie non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', categorieMiddleware.validateCategorieInput, categorieController.updateCategorie);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categorie]
 *     summary: Supprimer une catégorie spécifique par ID.
 *     description: Cette route permet de supprimer une catégorie spécifique par ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la catégorie.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;

