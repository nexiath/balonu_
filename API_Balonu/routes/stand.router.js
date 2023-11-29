const express = require("express");
const router = express.Router();
const standController = require('../controllers/stand.controller');
const standMiddleware = require('../middlewares/stand.middleware');
const authMiddleware = require('../middlewares/jwt.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', authMiddleware.verifyToken, standController.createStand);
router.get('/', standController.getAllStands);
router.get('/:id', standController.getStandById);
router.put('/:id', standMiddleware.validateStandInput, standController.updateStand);
router.delete('/:id', standController.deleteStand);

router.get('/emplacements/:id_emplacement', standController.getStandsByIdEmplacement);
router.get('/categorie/:id_categorie_stand', standController.getStandsByCategorie);
router.get('/utilisateur/:id', standController.getStandsByIdUtilisateur);

module.exports = router;
