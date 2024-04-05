const express = require("express");
const router = express.Router();
const pool = require('../config/db');
const prestaController = require('../controllers/presta.controller');
const prestaMiddleware = require('../middlewares/presta.middleware');

/**
 * @swagger
 * tags:
 *   name: Prestataires
 *   description: Opérations liées aux prestataires
 */

/**
 * @swagger
 * /presta/{id}/visite:
 *   put:
 *     tags: [Prestataires]
 *     summary: Mettre à jour le nombre de visiteurs d'un prestataire.
 *     description: Cette route permet de mettre à jour le nombre de visiteurs d'un prestataire en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nombre de visiteurs mis à jour avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id/visite', async (req, res) => {
    const prestataireId = req.params.id;
    try {
        const { rows } = await pool.query('SELECT nombre_visiteurs FROM presta WHERE id_presta = $1', [prestataireId]);
        let currentVisitors = rows[0].nombre_visiteurs;
        currentVisitors++;
        await pool.query('UPDATE presta SET nombre_visiteurs = $1 WHERE id_presta = $2', [currentVisitors, prestataireId]);
        res.status(200).json({ message: 'Nombre de visiteurs mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du nombre de visiteurs :', error);
        res.status(500).json({ error: 'Erreur interne' });
    }
});

/**
 * @swagger
 * /presta:
 *   get:
 *     tags: [Prestataires]
 *     summary: Récupérer tous les prestataires.
 *     description: Cette route permet de récupérer la liste de tous les prestataires.
 *     responses:
 *       200:
 *         description: La liste des prestataires récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', prestaController.getPrestataires);

/**
 * @swagger
 * /presta/{id}:
 *   get:
 *     tags: [Prestataires]
 *     summary: Récupérer un prestataire par ID.
 *     description: Cette route permet de récupérer un prestataire en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le prestataire récupéré avec succès.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', prestaController.getPrestataireByID);

/**
 * @swagger
 * /presta/utilisateur/{userId}:
 *   get:
 *     tags: [Prestataires]
 *     summary: Récupérer les prestataires d'un utilisateur.
 *     description: Cette route permet de récupérer la liste des prestataires d'un utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des prestataires de l'utilisateur récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/utilisateur/:userId', prestaController.getPrestatairesByUserId);

/**
 * @swagger
 * /presta/description/{id}:
 *   put:
 *     tags: [Prestataires]
 *     summary: Mettre à jour la description d'un prestataire.
 *     description: Cette route permet de mettre à jour la description d'un prestataire en fonction de son ID.
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
 *             $ref: '#/components/schemas/PrestataireDescriptionInput'
 *     responses:
 *       200:
 *         description: Description du prestataire mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/description/:id', prestaMiddleware.checkPrestataireExistence, prestaController.updateDescription);

/**
 * @swagger
 * /presta/photo/{id}:
 *   put:
 *     tags: [Prestataires]
 *     summary: Mettre à jour la photo de profil d'un prestataire.
 *     description: Cette route permet de mettre à jour la photo de profil d'un prestataire en fonction de son ID.
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
 *             $ref: '#/components/schemas/PrestatairePhotoInput'
 *     responses:
 *       200:
 *         description: Photo de profil du prestataire mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/photo/:id', prestaMiddleware.checkPrestataireExistence, prestaController.updateProfilePhoto);

/**
 * @swagger
 * /presta/{id}:
 *   delete:
 *     tags: [Prestataires]
 *     summary: Supprimer un prestataire par ID.
 *     description: Cette route permet de supprimer un prestataire en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Prestataire supprimé avec succès.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', prestaController.deletePrestataire);

/**
 * @swagger
 * /presta/{id_presta}/services/{serviceKey}:
 *   get:
 *     tags: [Prestataires]
 *     summary: Récupérer la visibilité d'un service pour un prestataire.
 *     description: Cette route permet de récupérer la visibilité d'un service pour un prestataire en fonction de son ID et de la clé du service.
 *     parameters:
 *       - in: path
 *         name: id_presta
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: serviceKey
 *         description: Clé du service.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visibilité du service récupérée avec succès.
 *       404:
 *         description: Prestataire ou service non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id_presta/services/:serviceKey', prestaController.getServiceVisibility);

/**
 * @swagger
 * /presta/{id_presta}/services/{serviceKey}:
 *   put:
 *     tags: [Prestataires]
 *     summary: Basculer la visibilité d'un service pour un prestataire.
 *     description: Cette route permet de basculer la visibilité d'un service pour un prestataire en fonction de son ID et de la clé du service.
 *     parameters:
 *       - in: path
 *         name: id_presta
 *         description: ID du prestataire.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: serviceKey
 *         description: Clé du service.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visibilité du service basculée avec succès.
 *       404:
 *         description: Prestataire ou service non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id_presta/services/:serviceKey', prestaController.toggleServiceVisibility);




/**
 * @swagger
 * /presta/entete/{id}:
 *   put:
 *     tags:
 *       - Prestataires
 *     summary: Mettre à jour l'entête du livre d'or d'un prestataire
 *     description: >
 *       Cette route permet de mettre à jour l'entête du livre d'or pour un prestataire spécifié par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du prestataire
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entete_livre_or:
 *                 type: string
 *                 description: Nouvel entête du livre d'or
 *                 example: "Bienvenue sur notre Livre d'Or"
 *     responses:
 *       200:
 *         description: L'entête du livre d'or a été mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Presta'
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Prestataire non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.put('/entete/:id', prestaController.updateEntete);


module.exports = router;

