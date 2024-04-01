const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relation.controller');
const relationMiddleware = require('../middlewares/relation.middleware');

/**
 * @swagger
 * tags:
 *   name: Relations
 *   description: Opérations liées aux relations (affectations, ventes, réservations, etc.)
 */

/**
 * @swagger
 * /relations/affectationsStand:
 *   post:
 *     tags: [Relations]
 *     summary: Affecter un utilisateur à un stand.
 *     description: Cette route permet d'affecter un utilisateur à un stand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AffectationStandInput'
 *     responses:
 *       201:
 *         description: Affectation réalisée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/affectationsStand', relationMiddleware.validateAffectationStandInput, relationController.addUtilisateurToStand);

/**
 * @swagger
 * /relations/affectationsStand:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer toutes les affectations de stands.
 *     description: Cette route permet de récupérer la liste de toutes les affectations de stands.
 *     responses:
 *       200:
 *         description: La liste des affectations de stands récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/affectationsStand', relationController.getAllAffectationsStands);

/**
 * @swagger
 * /relations/affectationsStand/{id}:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer une affectation de stand par ID.
 *     description: Cette route permet de récupérer une affectation de stand en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'affectation de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: L'affectation de stand récupérée avec succès.
 *       404:
 *         description: Affectation de stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/affectationsStand/:id', relationController.getAffectationStandByIdStand);

/**
 * @swagger
 * /relations/affectationsStand/{id}:
 *   delete:
 *     tags: [Relations]
 *     summary: Supprimer une affectation de stand par ID.
 *     description: Cette route permet de supprimer une affectation de stand en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'affectation de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Affectation de stand supprimée avec succès.
 *       404:
 *         description: Affectation de stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/affectationsStand/:id', relationController.deleteAffectationStandByIdStand);

/**
 * @swagger
 * /relations/ventes:
 *   post:
 *     tags: [Relations]
 *     summary: Ajouter un produit à un stand.
 *     description: Cette route permet d'ajouter un produit à un stand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VenteInput'
 *     responses:
 *       201:
 *         description: Vente réalisée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/ventes', relationMiddleware.validateVenteInput, relationController.addProduitToStand);

/**
 * @swagger
 * /relations/ventes:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer toutes les ventes.
 *     description: Cette route permet de récupérer la liste de toutes les ventes.
 *     responses:
 *       200:
 *         description: La liste des ventes récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/ventes', relationController.getAllVentes);

/**
 * @swagger
 * /relations/produitsByStand/{idStand}:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer tous les produits d'un stand.
 *     description: Cette route permet de récupérer la liste de tous les produits d'un stand en fonction de l'ID du stand.
 *     parameters:
 *       - in: path
 *         name: idStand
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des produits du stand récupérée avec succès.
 *       404:
 *         description: Aucun produit trouvé pour le stand spécifié.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/produitsByStand/:idStand', relationController.getAllProduitsByStand);

/**
 * @swagger
 * /relations/affectationsStand/{idStand}/{idProduit}:
 *   delete:
 *     tags: [Relations]
 *     summary: Supprimer la relation produit-stand.
 *     description: Cette route permet de supprimer la relation entre un produit et un stand en fonction de leurs IDs.
 *     parameters:
 *       - in: path
 *         name: idStand
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idProduit
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Relation produit-stand supprimée avec succès.
 *       404:
 *         description: Relation produit-stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/affectationsStand/:idStand/:idProduit', relationController.deleteRelationProduitStand);

/**
 * @swagger
 * /relations/affectationsStand/{idStand}/{idProduit}:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer l'ID du produit à partir de la relation produit-stand.
 *     description: Cette route permet de récupérer l'ID du produit à partir de la relation produit-stand en fonction de leurs IDs.
 *     parameters:
 *       - in: path
 *         name: idStand
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idProduit
 *         description: ID du produit.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ID du produit récupéré avec succès.
 *       404:
 *         description: Relation produit-stand non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/affectationsStand/:idStand/:idProduit', relationController.getProduitIdFromRelation);


/**
 * @swagger
 * /relations/affectationsMontgolfiere:
 *   post:
 *     tags: [Relations]
 *     summary: Affecter un utilisateur à une montgolfière.
 *     description: Cette route permet d'affecter un utilisateur à une montgolfière.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AffectationMontgolfiereInput'
 *     responses:
 *       201:
 *         description: Affectation réalisée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/affectationsMontgolfiere', relationMiddleware.validateAffectationMontgolfiereInput, relationController.addUtilisateurToMontgolfiere);

/**
 * @swagger
 * /relations/affectationsMontgolfiere:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer toutes les affectations de montgolfières.
 *     description: Cette route permet de récupérer la liste de toutes les affectations de montgolfières.
 *     responses:
 *       200:
 *         description: La liste des affectations de montgolfières récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/affectationsMontgolfiere', relationController.getAllAffectationsMontgolfieres);

/**
 * @swagger
 * /relations/affectationsVol:
 *   post:
 *     tags: [Relations]
 *     summary: Affecter un utilisateur à un vol.
 *     description: Cette route permet d'affecter un utilisateur à un vol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AffectationVolInput'
 *     responses:
 *       201:
 *         description: Affectation réalisée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/affectationsVol', relationMiddleware.validateAffectationVolInput, relationController.addUtilisateurToVol);

/**
 * @swagger
 * /relations/affectationsVol:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer toutes les affectations de vols.
 *     description: Cette route permet de récupérer la liste de toutes les affectations de vols.
 *     responses:
 *       200:
 *         description: La liste des affectations de vols récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/affectationsVol', relationController.getAllAffectationsVols);

/**
 * @swagger
 * /relations/reservations:
 *   post:
 *     tags: [Relations]
 *     summary: Réserver un emplacement.
 *     description: Cette route permet de réserver un emplacement.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationEmplacementInput'
 *     responses:
 *       201:
 *         description: Réservation réalisée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/reservations', relationMiddleware.validateReservationEmplacementInput, relationController.reserveEmplacement);

/**
 * @swagger
 * /relations/reservations:
 *   get:
 *     tags: [Relations]
 *     summary: Récupérer toutes les réservations.
 *     description: Cette route permet de récupérer la liste de toutes les réservations.
 *     responses:
 *       200:
 *         description: La liste des réservations récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/reservations', relationController.getAllReservations);

module.exports = router;

