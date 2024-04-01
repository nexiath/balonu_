const express = require("express");
const router = express.Router();
const roleController = require('../controllers/role.controller');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Opérations liées aux rôles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Récupérer tous les rôles.
 *     description: Cette route permet de récupérer la liste de tous les rôles.
 *     responses:
 *       200:
 *         description: La liste des rôles récupérée avec succès.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/', roleController.getRole);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Récupérer un rôle par ID.
 *     description: Cette route permet de récupérer un rôle en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du rôle.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le rôle récupéré avec succès.
 *       404:
 *         description: Rôle non trouvé.
 *       500:
 *         description: Erreur serveur interne.
 */
router.get('/:id', roleController.getRoleById);

module.exports = router;

