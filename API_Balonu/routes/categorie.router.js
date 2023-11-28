const express = require("express");
const router = express.Router();
const categorieController = require('../controllers/categorie.controller');
const categorieMiddleware = require('../middlewares/categorie.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', categorieMiddleware.validateCategorieInput, categorieController.createCategorie);
router.get('/', categorieController.getAllCategories);
router.get('/:id', categorieController.getCategorieById);
router.put('/:id', categorieMiddleware.validateCategorieInput, categorieController.updateCategorie);
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
