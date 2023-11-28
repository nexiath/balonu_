const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');


router.get("/home", (req, res) => {
    res.send("Bienvenue sur la page d'accueil !");
});


router.get('/', usersController.getUtilisateurs);
router.get('/:id', usersController.getUtilisateurByID);
router.get('/roles/:id_role', usersController.getUtilisateurByRole);
router.post('/', usersMiddleware.validateUserInput, usersController.createUtilisateur);
router.put('/:id', usersMiddleware.validateUserInput, usersController.updateUtilisateur); 
router.post('/login', usersMiddleware.validateLogin, usersController.login);
router.delete('/:id', usersController.deleteUtilisateur);

module.exports = router;
