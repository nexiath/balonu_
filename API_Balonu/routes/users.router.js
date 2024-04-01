const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Opérations liées aux utilisateurs
 */

/**
 * @swagger
 * /utilisateurs:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupérer tous les utilisateurs.
 *     description: Cette route permet de récupérer la liste de tous les utilisateurs.
 *     responses:
 *       200:
 *         description: La liste des utilisateurs récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', usersController.getUtilisateurs);

/**
 * @swagger
 * /utilisateurs/{id}:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupérer un utilisateur par ID.
 *     description: Cette route permet de récupérer un utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: L'utilisateur récupéré avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', usersController.getUtilisateurByID);

/**
 * @swagger
 * /utilisateurs/roles/{id_role}:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupérer les utilisateurs par rôle.
 *     description: Cette route permet de récupérer les utilisateurs en fonction du rôle.
 *     parameters:
 *       - in: path
 *         name: id_role
 *         description: ID du rôle.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La liste des utilisateurs récupérée avec succès en fonction du rôle.
 *       404:
 *         description: Aucun utilisateur trouvé pour le rôle spécifié.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/roles/:id_role', usersController.getUtilisateurByRole);
/**
 * @swagger
 * /utilisateurs:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Créer un nouvel utilisateur.
 *     description: Cette route permet de créer un nouvel utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/', usersMiddleware.validateUserInput, usersController.createUtilisateur);

/**
 * @swagger
 * /utilisateurs/{id}:
 *   put:
 *     tags: [Utilisateurs]
 *     summary: Mettre à jour un utilisateur par ID.
 *     description: Cette route permet de mettre à jour un utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur interne.
 */
router.put('/:id', usersMiddleware.validateUserInput, usersController.updateUtilisateur);
/**
 * @swagger
 * /utilisateurs/login:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Connexion de l'utilisateur.
 *     description: Cette route permet à un utilisateur de se connecter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *       401:
 *         description: Identifiants incorrects.
 *       500:
 *         description: Erreur serveur interne.
 */
router.post('/login', usersMiddleware.validateLogin, usersController.login);
/**
 * @swagger
 * /utilisateurs/{id}:
 *   delete:
 *     tags: [Utilisateurs]
 *     summary: Supprimer un utilisateur par ID.
 *     description: Cette route permet de supprimer un utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.delete('/:id', usersController.deleteUtilisateur);

module.exports = router;
