const express = require("express");
const router = express.Router();
const standController = require('../controllers/stand.controller');
const standMiddleware = require('../middlewares/stand.middleware');
const authMiddleware = require('../middlewares/jwt.middleware');
const validateAndAuthenticate = require('../middlewares/montgolfiere.middleware');

/**
 * @swagger
 * tags:
 *   name: Stands
 *   description: Opérations liées aux Stands
 */

/**
 * @swagger
 * /stands:
 *   post:
 *     tags: [Stands]
 *     summary: Créer un nouveau stand.
 *     description: Cette route permet de créer un nouveau stand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StandInput'
 *     responses:
 *       201:
 *         description: Stand créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       401:
 *         description: Authentification échouée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', standMiddleware.validateAndAuthenticateStand, standController.createStand);
/**
 * @swagger
 * /stands:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer tous les stands.
 *     description: Cette route permet de récupérer la liste de tous les stands.
 *     responses:
 *       200:
 *         description: La liste des stands récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', standController.getAllStands);
/**
 * @swagger
 * /stands/nombreBoutiques:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer le nombre de boutiques.
 *     description: Cette route permet de récupérer le nombre de boutiques disponibles.
 *     responses:
 *       200:
 *         description: Le nombre de boutiques récupéré avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/nombreBoutiques/', standController.getNumberOfBoutiques);
/**
 * @swagger
 * /stands/nombreRestaurants:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer le nombre de restaurants.
 *     description: Cette route permet de récupérer le nombre de restaurants disponibles.
 *     responses:
 *       200:
 *         description: Le nombre de restaurants récupéré avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/nombreRestaurants/', standController.getNumberOfRestaurants);
/**
 * @swagger
 * /stands/{id}:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer un stand par ID.
 *     description: Cette route permet de récupérer un stand en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le stand récupéré avec succès.
 *       404:
 *         description: Stand non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', standController.getStandById);
/**
 * @swagger
 * /stands/{id}:
 *   put:
 *     tags: [Stands]
 *     summary: Mettre à jour un stand par ID.
 *     description: Cette route permet de mettre à jour un stand en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StandInput'
 *     responses:
 *       200:
 *         description: Stand mis à jour avec succès.
 *       404:
 *         description: Stand non trouvé.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', standMiddleware.validateStandInput, standController.updateStand);
/**
 * @swagger
 * /stands/{id}:
 *   delete:
 *     tags: [Stands]
 *     summary: Supprimer un stand par ID.
 *     description: Cette route permet de supprimer un stand en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Stand supprimé avec succès.
 *       404:
 *         description: Stand non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', standController.deleteStand);

/**
 * @swagger
 * /stands/emplacements/{id_emplacement}:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer les stands par ID d'emplacement.
 *     description: Cette route permet de récupérer les stands en fonction de l'ID de l'emplacement.
 *     parameters:
 *       - in: path
 *         name: id_emplacement
 *         description: ID de l'emplacement.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des stands récupérée avec succès en fonction de l'ID de l'emplacement.
 *       404:
 *         description: Aucun stand trouvé pour l'emplacement spécifié.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/emplacements/:id_emplacement', standController.getStandsByIdEmplacement);
/**
 * @swagger
 * /stands/categorie/{id_categorie_stand}:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer les stands par ID de catégorie.
 *     description: Cette route permet de récupérer les stands en fonction de l'ID de la catégorie.
 *     parameters:
 *       - in: path
 *         name: id_categorie_stand
 *         description: ID de la catégorie de stand.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des stands récupérée avec succès en fonction de l'ID de la catégorie.
 *       404:
 *         description: Aucun stand trouvé pour la catégorie spécifiée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/categorie/:id_categorie_stand', standController.getStandsByCategorie);
/**
 * @swagger
 * /stands/utilisateur/{id}:
 *   get:
 *     tags: [Stands]
 *     summary: Récupérer les stands par ID d'utilisateur.
 *     description: Cette route permet de récupérer les stands en fonction de l'ID de l'utilisateur.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des stands récupérée avec succès en fonction de l'ID de l'utilisateur.
 *       404:
 *         description: Aucun stand trouvé pour l'utilisateur spécifié.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/utilisateur/:id', standController.getStandsByIdUtilisateur);

module.exports = router;
