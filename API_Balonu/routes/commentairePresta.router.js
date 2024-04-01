const express = require("express");
const router = express.Router();
const commentaireController = require('../controllers/commentairePresta.controller');
const prestataireExists = require("../middlewares/commentairePresta.middleware");

/**
 * @swagger
 * tags:
 *   name: CommentairePresta
 *   description: Opérations liées aux commentaires des prestataires
 */

/**
 * @swagger
 * /commentaires/{id}:
 *   get:
 *     tags: [CommentairePresta]
 *     summary: Récupérer les commentaires d'un prestataire.
 *     description: Cette route permet de récupérer les commentaires associés à un prestataire.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', commentaireController.getCommentaires);

/**
 * @swagger
 * /commentaires/{id}:
 *   post:
 *     tags: [CommentairePresta]
 *     summary: Ajouter un commentaire pour un prestataire.
 *     description: Cette route permet d'ajouter un commentaire pour un prestataire.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentaireInput'
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/:id', prestataireExists, commentaireController.addCommentaire);

/**
 * @swagger
 * /commentaires/{id}/{commentaireId}:
 *   put:
 *     tags: [CommentairePresta]
 *     summary: Mettre à jour un commentaire spécifique pour un prestataire.
 *     description: Cette route permet de mettre à jour un commentaire spécifique associé à un prestataire.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentaireId
 *         description: ID du commentaire.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentaireInput'
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Commentaire ou prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id/:commentaireId', prestataireExists, commentaireController.updateCommentaire);

/**
 * @swagger
 * /commentaires/{id}/{commentaireId}:
 *   delete:
 *     tags: [CommentairePresta]
 *     summary: Supprimer un commentaire spécifique pour un prestataire.
 *     description: Cette route permet de supprimer un commentaire spécifique associé à un prestataire.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentaireId
 *         description: ID du commentaire.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès.
 *       404:
 *         description: Commentaire ou prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id/:commentaireId', commentaireController.deleteCommentaire);

module.exports = router;

