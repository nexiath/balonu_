const express = require("express");
const router = express.Router();
const produitController = require('../controllers/produit.controller');
const produitMiddleware = require('../middlewares/produit.middleware');

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Opérations liées aux produits
 */

/**
 * @swagger
 * /produits:
 *   post:
 *     tags: [Produits]
 *     summary: Créer un nouveau produit.
 *     description: Cette route permet de créer un nouveau produit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       201:
 *         description: Produit créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', produitMiddleware.validateProduitInput, produitController.createProduit);

/**
 * @swagger
 * /produits:
 *   get:
 *     tags: [Produits]
 *     summary: Récupérer tous les produits.
 *     description: Cette route permet de récupérer la liste de tous les produits.
 *     responses:
 *       200:
 *         description: La liste des produits récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', produitController.getAllProduits);

/**
 * @swagger
 * /produits/{id}:
 *   get:
 *     tags: [Produits]
 *     summary: Récupérer un produit par ID.
 *     description: Cette route permet de récupérer un produit en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le produit récupéré avec succès.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', produitController.getProduitById);

/**
 * @swagger
 * /produits/{id}:
 *   put:
 *     tags: [Produits]
 *     summary: Mettre à jour un produit par ID.
 *     description: Cette route permet de mettre à jour un produit en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', produitController.updateProduit);
/**
 * @swagger
 * /produits/{id}:
 *   delete:
 *     tags: [Produits]
 *     summary: Supprimer un produit par ID.
 *     description: Cette route permet de supprimer un produit en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produit supprimé avec succès.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', produitController.deleteProduit);

/**
 * @swagger
 * /produits/{id}/updatestock:
 *   put:
 *     tags: [Produits]
 *     summary: Mettre à jour le stock d'un produit par ID.
 *     description: Cette route permet de mettre à jour le stock d'un produit en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitStockInput'
 *     responses:
 *       200:
 *         description: Stock du produit mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id/updatestock', produitController.updateProductStock);

module.exports = router;

