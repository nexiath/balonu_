const express = require("express");
const router = express.Router();
const montgolfiereController = require('../controllers/montgolfiere.controller');
const validateAndAuthenticate = require('../middlewares/montgolfiere.middleware');

router.get("/home", (req, res) => {
    res.send("Bienvenue sur la page d'accueil des montgolfières");
});

router.post('/', validateAndAuthenticate, montgolfiereController.createMontgolfiere);
router.get('/', montgolfiereController.getMontgolfieres);
router.get('/:id', montgolfiereController.getMontgolfiereById);
router.put('/:id', validateAndAuthenticate, montgolfiereController.updateMontgolfiere);
router.delete('/:id', validateAndAuthenticate, montgolfiereController.deleteMontgolfiere);
router.get('/utilisateur/:id_utilisateur', montgolfiereController.getMontgolfieresByUtilisateur);


module.exports = router;
