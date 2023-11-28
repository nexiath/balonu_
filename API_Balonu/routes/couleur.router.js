const express = require("express");
const router = express.Router();
const couleurController = require('../controllers/couleur.controller');
const couleurMiddleware = require('../middlewares/couleur.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', couleurMiddleware.validateCouleurInput, couleurController.createCouleur);
router.get('/', couleurController.getAllCouleurs);
router.get('/:id', couleurController.getCouleurById);
router.put('/:id', couleurMiddleware.validateCouleurInput, couleurController.updateCouleur);
router.delete('/:id', couleurController.deleteCouleur);

module.exports = router;
