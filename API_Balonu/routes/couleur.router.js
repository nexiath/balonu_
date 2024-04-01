const express = require('express');
const router = express.Router();
const couleurController = require('../controllers/couleur.controller');

/**
 * @swagger
 * tags:
 *   name: Couleur
 *   description: Opérations liées aux couleurs
 */

/**
 * @swagger
 * /couleurs:
 *   get:
 *     tags: [Couleur]
 *     summary: Récupérer toutes les couleurs.
 *     description: Cette route permet de récupérer toutes les couleurs disponibles.
 *     responses:
 *       200:
 *         description: Liste de toutes les couleurs récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', couleurController.obtenirToutesLesCouleurs);

/**
 * @swagger
 * /couleurs:
 *   post:
 *     tags: [Couleur]
 *     summary: Ajouter une nouvelle couleur.
 *     description: Cette route permet d'ajouter une nouvelle couleur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouleurInput'
 *     responses:
 *       201:
 *         description: Couleur ajoutée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', couleurController.ajouterCouleur);

/**
 * @swagger
 * /couleurs/{id}:
 *   put:
 *     tags: [Couleur]
 *     summary: Mettre à jour une couleur existante.
 *     description: Cette route permet de mettre à jour une couleur existante en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la couleur.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouleurInput'
 *     responses:
 *       200:
 *         description: Couleur mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Couleur non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', couleurController.mettreAJourCouleur);

/**
 * @swagger
 * /couleurs/{id}:
 *   delete:
 *     tags: [Couleur]
 *     summary: Supprimer une couleur existante.
 *     description: Cette route permet de supprimer une couleur existante en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la couleur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Couleur supprimée avec succès.
 *       404:
 *         description: Couleur non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', couleurController.supprimerCouleur);

module.exports = router;

