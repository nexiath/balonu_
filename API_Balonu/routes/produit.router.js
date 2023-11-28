const express = require("express");
const router = express.Router();
const produitController = require('../controllers/produit.controller');
const produitMiddleware = require('../middlewares/produit.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', produitMiddleware.validateProduitInput, produitController.createProduit);
router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.put('/:id', produitMiddleware.validateProduitInput, produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);

module.exports = router;
