const express = require("express");
const router = express.Router();
const volController = require('../controllers/vol.controller');
const volMiddleware = require('../middlewares/vol.middleware');

/**
 * @swagger
 * tags:
 *   name: Vols
 *   description: Opérations liées aux vols
 */


/**
 * @swagger
 * /vols:
 *   get:
 *     tags: [Vols]
 *     summary: Récupérer tous les vols.
 *     description: Cette route permet de récupérer la liste de tous les vols.
 *     responses:
 *       200:
 *         description: La liste des vols récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', volController.getAllVols);
/**
 * @swagger
 * /vols:
 *   post:
 *     tags: [Vols]
 *     summary: Créer un nouveau vol.
 *     description: Cette route permet de créer un nouveau vol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VolInput'
 *     responses:
 *       201:
 *         description: Vol créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', volController.createVol);
/**
 * @swagger
 * /vols/{id}:
 *   get:
 *     tags: [Vols]
 *     summary: Récupérer un vol par ID.
 *     description: Cette route permet de récupérer un vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du vol.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le vol récupéré avec succès.
 *       404:
 *         description: Vol non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', volController.getVolById);
/**
 * @swagger
 * /vols/{id}:
 *   put:
 *     tags: [Vols]
 *     summary: Mettre à jour un vol par ID.
 *     description: Cette route permet de mettre à jour un vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du vol.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VolInput'
 *     responses:
 *       200:
 *         description: Vol mis à jour avec succès.
 *       404:
 *         description: Vol non trouvé.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', volController.updateVol);
/**
 * @swagger
 * /vols/{id}:
 *   delete:
 *     tags: [Vols]
 *     summary: Supprimer un vol par ID.
 *     description: Cette route permet de supprimer un vol en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du vol.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Vol supprimé avec succès.
 *       404:
 *         description: Vol non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', volController.deleteVol);
/**
 * @swagger
 * /vols/parcours/{idParcours}:
 *   get:
 *     tags: [Vols]
 *     summary: Récupérer les vols par ID de parcours.
 *     description: Cette route permet de récupérer les vols en fonction de l'ID du parcours.
 *     parameters:
 *       - in: path
 *         name: idParcours
 *         description: ID du parcours.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des vols récupérée avec succès en fonction de l'ID du parcours.
 *       404:
 *         description: Aucun vol trouvé pour le parcours spécifié.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/parcours/:idParcours', volController.getVolByParcours);

module.exports = router;
