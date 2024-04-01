const express = require('express');
const montgolfiereController = require('../controllers/montgolfiere.controller');
const { modifierMontgolfiere } = require('../services/montgolfiereService');
const validateAndAuthenticate = require('../middlewares/montgolfiere.middleware');
const authMiddleware = montgolfiereController.authMiddleware;
const updateMontgolfiere = montgolfiereController.updateMontgolfiere;
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Montgolfiere
 *   description: Opérations liées aux montgolfières
 */

/**
 * @swagger
 * /montgolfieres:
 *   post:
 *     tags: [Montgolfiere]
 *     summary: Créer une montgolfière.
 *     description: Cette route permet de créer une nouvelle montgolfière.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MontgolfiereInput'
 *     responses:
 *       201:
 *         description: Montgolfière créée avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', montgolfiereController.creerMontgolfiere);

/**
 * @swagger
 * /montgolfieres/{id}:
 *   get:
 *     tags: [Montgolfiere]
 *     summary: Récupérer une montgolfière par ID.
 *     description: Cette route permet de récupérer une montgolfière en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La montgolfière récupérée avec succès.
 *       404:
 *         description: Montgolfière non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', montgolfiereController.getMontgolfiereById);

/**
 * @swagger
 * /montgolfieres:
 *   get:
 *     tags: [Montgolfiere]
 *     summary: Récupérer toutes les montgolfières.
 *     description: Cette route permet de récupérer la liste de toutes les montgolfières.
 *     responses:
 *       200:
 *         description: La liste des montgolfières récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', montgolfiereController.getMontgolfieres);

/**
 * @swagger
 * /montgolfieres/utilisateur/{id}:
 *   get:
 *     tags: [Montgolfiere]
 *     summary: Récupérer les montgolfières d'un utilisateur.
 *     description: Cette route permet de récupérer la liste des montgolfières d'un utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des montgolfières de l'utilisateur récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/utilisateur/:id', montgolfiereController.getMontgolfieresByUtilisateur);

/**
 * @swagger
 * /montgolfieres/modifier/{id}:
 *   put:
 *     tags: [Montgolfiere]
 *     summary: Modifier le nombre de places d'une montgolfière par ID.
 *     description: Cette route permet de modifier le nombre de places d'une montgolfière en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NombrePlacesInput'
 *     responses:
 *       200:
 *         description: Nombre de places de la montgolfière modifié avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Montgolfière non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/modifier/:id', async (req, res) => {
    try {
        const idMontgolfiere = parseInt(req.params.id);
        const { nombrePlace } = req.body;
        const resultat = await modifierMontgolfiere(idMontgolfiere, nombrePlace);
        res.status(200).json({ message: resultat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

/**
 * @swagger
 * /montgolfieres/{id}:
 *   put:
 *     tags: [Montgolfiere]
 *     summary: Mettre à jour une montgolfière par ID.
 *     description: Cette route permet de mettre à jour une montgolfière en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MontgolfiereInput'
 *     responses:
 *       200:
 *         description: Montgolfière mise à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Montgolfière non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', montgolfiereController.authMiddleware, montgolfiereController.updateMontgolfiere);

/**
 * @swagger
 * /montgolfieres/{id}:
 *   delete:
 *     tags: [Montgolfiere]
 *     summary: Supprimer une montgolfière par ID.
 *     description: Cette route permet de supprimer une montgolfière en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la montgolfière.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Montgolfière supprimée avec succès.
 *       404:
 *         description: Montgolfière non trouvée.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', montgolfiereController.authMiddleware, montgolfiereController.deleteMontgolfiere);

module.exports = router;




