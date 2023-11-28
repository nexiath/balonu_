const express = require("express");
const router = express.Router();
const categorieStandController = require('../controllers/categorieStand.controller');
const categorieStandMiddleware = require('../middlewares/categorieStand.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', categorieStandMiddleware.validateStandInput, categorieStandController.createCategorieStand);
router.get('/', categorieStandController.getAllCategories);
router.get('/:id_categorie_stand', categorieStandController.getCategorieById);
router.put('/:id_categorie_stand', categorieStandMiddleware.validateStandInput, categorieStandController.updateCategorieStand);
router.delete('/:id_categorie_stand', categorieStandController.deleteCategorieStand);


module.exports = router;
